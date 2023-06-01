<template lang="pug">
v-col.px-0
  .mt-11.mb-11(
    v-for='(section, s_id) in $t(this.itemsPath)',
    :class='s_id >= 2 ? "pt-11 pb-11" : "pt-3 pb-3"',
    :key='s_id'
  )
    h2.sf.section-title.pb-10 {{ section.title }}
    div(v-if='section.type == "paragraphs"') 
      .sf(v-for='(paragraph, p_id) in section.paragraphs')
        div(v-if='typeof paragraph == typeof {}' style="max-width: 875px")
          v-lazy.d-flex.justify-center(
            v-if='paragraph.type == "video"',
            :options='{threshold: 0.9}'
            min-height="400"
            transition="fade-transition"
            )
            video.explainer(
              :src='paragraph.video'
              controls :autoplay='paragraph.autoplay' muted)
        p.paragraph(v-else, v-html='paragraph')
      v-btn.first-action-btn.no-scale(
        v-if='section.button',
        @click='$router.push(section.button.to)',
        text,
        x-large,
        dark,
        depressed
        )
          span.sf.font-weight-regular {{ section.button.text }}
          v-icon.pl-2 mdi-arrow-right-circle
    .blocks(v-if='section.type == "blocks"') 
      .d-flex(dense, :class='$vuetify.breakpoint.mobile ? "flex-column" : "flex-row"')
        .d-flex.pr-10.justify-space-between(
          :class='$vuetify.breakpoint.mobile ? "flex-row" : "flex-column"',
          v-for='(block, b_id) in section.blocks',
          :key='b_id'
        )
          v-card.block(flat, :class='block.noimage ? "noimage" : ""')
            div(v-if='!block.url')
              v-img.white--text.align-end(:src='block.image', cover, max-width='80vw', max-height='30ch')
              v-card-title.block-title
                span {{ block.title }}
              v-card-text.block-description {{ block.description }}
            a.no-underline.no-link-decoration(v-else-if='block.url.includes("https")' :href='block.url')
              v-img.white--text.align-end(:src='block.image', cover, max-width='80vw', max-height='30ch')
              v-card-title.block-title
                a(:href='block.url') {{ block.title }}
              v-card-text.block-description {{ block.description }}
            router-link.no-underline.no-link-decoration(v-else :to='block.url')
              v-img.white--text.align-end(:src='block.image', cover, max-width='80vw', max-height='30ch')
              v-card-title.block-title
                router-link(:to='block.url') {{ block.title }}
              v-card-text.block-description {{ block.description }}
    #cards.d-flex(v-if='section.type == "cards"')
      v-card.ma-4.ml-0(
        flat,
        elevation=0,
        v-for='(card, c_id) in section.cards',
        :key='c_id'
      )
        v-img.white--text.align-end(:src='card.image')
          v-card-title.ml-sm-2.ml-xs-0.sf
            a.no-link-decoration(:href='card.url', target='_blank') {{ card.title }}
          v-card-subtitle.ml-sm-2.ml-xs-0.mb-sm-2.mb-xs-0.sf {{ card.subtitle }}
    div(v-if='section.type == "publications"')
      .publication.mb-8(
        v-if='section.publications'
        v-for='(publication, p_id) in section.publications',
        :key='p_id'
      ) 
        p.publication-title.mb-1.sf(v-html='publication.title')
        div(v-show='!publication.removeSpoiler')
          input(
            v-model='isPublicationOpen[p_id]',
            type='checkbox',
            :id='"p-" + p_id',
            style='display: none'
          )
          label(:for='"p-" + p_id') 
            a.sf.no-link-decaration 
              span See More
              v-icon(v-if='!isPublicationOpen[p_id]', color='primary') mdi-menu-right
              v-icon(v-else, color='primary') mdi-menu-down
          transition(name='fadeHeight', mode='in-out')
            div 
              p.mb-2.publication-description.sf(
                v-show='isPublicationOpen[p_id]'
              ) {{ publication.description }}
              a.sf(
                v-show='isPublicationOpen[p_id]',
                :href='publication.url',
                target='_blank'
              ) {{ publication.url }}
      //- span(v-show='isPublicationOpen[0]') {{ isPublicationOpen }}
    div(v-if='section.type == "annual"')
      .year(v-for='(year, y_id) in getYearsForAnnual(section.data)')
        input(
          v-model='isYearOpen[y_id]',
          type='checkbox',
          :id='"a-" + y_id',
          style='display: none'
        )
        label(:for='"a-" + y_id') 
          span
            span.sf.pt-6 {{ year }}
            v-icon.pt-5(x-large, v-if='!isYearOpen[y_id]') mdi-menu-right
            v-icon.pt-5(x-large, v-else) mdi-menu-down
        transition(name='fadeHeight', mode='in-out')
          div
            .pt-5.pb-2(
              v-show='isYearOpen[y_id]',
              v-for='thesis in getAnnualByYear(section.data, year)'
            )
              .thesis-title {{ thesis.title }}
              .thesis-description {{ thesis.description }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    itemsPath: {
      type: String,
    },
  },
})
export default class ServiceDescription extends Vue {
  itemsPath!: string

  isPublicationOpen: boolean[] = []

  isYearOpen: boolean[] = []

  mounted() {
    // @ts-ignore
    if (this.$t(this.itemsPath).filter((e) => e.type == 'publications').length)
    this.isPublicationOpen = new Array<boolean>(
        // @ts-ignore
        this.$t(this.itemsPath).filter(
          (e) => e.type == 'publications'
        )[0].publications.length
        ).fill(false)
        
    // @ts-ignore
    if (this.$t(this.itemsPath).filter((e) => e.type == 'annual').length)
    this.isYearOpen = Array.prototype.concat(
      true,
      ...new Array<boolean>(
          // @ts-ignore
          this.$t(this.itemsPath).filter((e) => e.type == 'annual')[0].data
            .length - 1
        ).fill(false)
      )
  }

  getYearsForAnnual(data: object[]) {
    // @ts-ignore
    const years = new Set(data.map((el) => el.year))
    return [...years.values()]
  }

  getAnnualByYear(data, year) {
    return data.filter((el) => el.year == year)
  }
}
</script>
<style>
p.paragraph > a.no-link-decoration {
  font-family: 'SF Pro Display', sans-serif;
  color: var(--v-text) !important;
  font-size: 22px;
  font-weight: 500;
  text-decoration: none;
}
#cards > .v-card.theme--light > .v-image > .v-responsive__sizer {
  background-image: linear-gradient(
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(38, 38, 39, 0.5) 85%,
    rgba(21, 22, 23, 0.9) 100%
  );
}
#cards > .v-card.theme--dark > .v-image > .v-responsive__sizer {
  background-image: linear-gradient(
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(31, 40, 61, 0.5) 85%,
    rgba(13, 22, 33, 0.9) 100%
  );
}
#cards > * > .v-image > .v-image__image {
  filter: grayscale(1);
}
#cards > * > .v-image > .v-responsive__content {
  /* override default width:768px; */
  width: 100% !important;
}
.section-title {
  font-style: normal;
  font-weight: 800;

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;

  /* theme/text */
  color: var(--v-text);
}
h2.section-title {
  font-size: min(4rem, 48px);
  line-height: 127%;
  text-shadow: -2px 2px 8px rgba(0, 0, 0, 0.25);
}
h5.section-title {
  font-size: min(2rem, 32px);
  line-height: 127%;
  text-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);
  /* or 81px */
}
</style>
<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition-property: opacity, max-height;
  transition: 0.35s ease-in-out;
  overflow: hidden;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  max-height: 0;
  opacity: 0;
}
.publication-description {
  max-height: 100%;
}

p.paragraph {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  max-width: 875px;
  /* or 160% */

  align-items: center;

  /* theme/text */
  color: var(--v-text) !important;

  filter: drop-shadow(-2px 2px 8px rgba(0, 0, 0, 0.25));
}

.blocks > .flex-row {
  overflow-x: auto;
  max-width: 90vw;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-grow: 0 1;
  align-content: stretch;
}

.blocks > .flex-row > .flex-column {
  min-width: 300px;
  flex: 1 1 0;
}
.blocks > .flex-column > .flex-row:not(:last-child) {
  padding-bottom: 10rem;
}
.blocks > .flex-column > .flex-row > .v-card {
  min-width: 300px;
}

.block {
  flex: 1 0 auto;
  background: linear-gradient(
    180deg,
    rgba(59, 61, 60, 0) 80%,
    rgba(59, 61, 60, 0.1) 92.19%
    ),
    var(--v-accent);
  box-shadow: -2px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.block.noimage {
  height: auto !important;
  min-height: 300px;
}
  
.block:hover {
  transition: all ease-in-out 0.4s;
  background: linear-gradient(
      180deg,
      rgba(149, 203, 206, 0) 80%,
      rgba(149, 203, 206, 0.25) 92.19%
    ),
    var(--v-accent);
}

.block-title {
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 127%;
  /* identical to box height, or 41px */

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;

  /* theme/text */
  color: var(--v-text);

  word-break: break-word !important;
}

.block-description {
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 127%;
  /* or 25px */

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;

  /* theme/text */
  color: var(--v-text);
}

#cards {
  flex-wrap: wrap;
}
#cards > * {
  aspect-ratio: 1;
  filter: drop-shadow(-1px 1px 6px rgba(0, 0, 0, 0.15));
  align-self: center;
}
@media screen and (max-width: 600px) {
  #cards > * {
    flex: 0 0 44%;
  }
}
@media screen and (min-width: 600px) and (max-width: 900px) {
  #cards > * {
    flex: 0 0 30%;
  }
}
@media screen and (min-width: 900px) {
  #cards > * {
    flex: 0 0 21%;
  }
}

#cards > .v-card > .v-image > .v-responsive__content > .v-card__title {
  white-space: pre-line;
  word-break: break-word;

  font-weight: 600;
  font-size: 16px;
  line-height: 127%;
  /* or 20px */
  letter-spacing: 0.01em;

  color: var(--v-primaryThin) !important;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 400px) {
  #cards > .v-card > .v-image > .v-responsive__content > .v-card__title {
    font-size: 14px;
    line-height: 90%;
  }
}

#cards > .v-card > .v-image > .v-responsive__content > .v-card__title > a {
  text-decoration: none;
}

#cards
  > .v-card:hover
  > .v-image
  > .v-responsive__content
  > .v-card__title
  > a {
  color: var(--v-primary) !important;
  text-decoration: underline;
}

#cards > .v-card > .v-image > .v-responsive__content > .v-card__subtitle {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 127%;
  /* or 15px */

  color: #afafaf;
}

.v-image__image--preload {
  background: #fff !important;
}
.publication > p.publication-title {
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  /* or 160% */

  /* theme/text */
  color: var(--v-text);
}
.publication > * > * > p.publication-description {
  font-size: 18px;
  line-height: 28px;
  /* or 178% */

  /* theme/text */
  color: var(--v-text);
}

.publication > div > label {
  display: block;
  width: 100%;
}

.publication > div > label > a {
  display: block;
  width: 100%;

  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  /* or 160% */

  /* theme/primary */
  color: var(--v-primaryThin) !important;
}

.publication > div > div > a {
  font-size: 16px;
  text-decoration: none;
  color: var(--v-primary) !important;
}

.year > label > span {
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 127%;
  /* identical to box height, or 51px */

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;

  /* theme/text */
  color: var(--v-text);
}
.year > label > span:hover {
  cursor: pointer;
}

.thesis-title {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 127%;
  /* or 30px */

  letter-spacing: 0.02em;

  /* theme/primary */
  color: var(--v-primary);
}
.thesis-description {
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  /* identical to box height, or 160% */

  /* theme/primary */
  color: var(--v-text);
}

.no-link-decaration:hover {
  text-decoration: none;
  filter: brightness(1.1);
}

.no-link-decaration:hover > * {
  text-decoration: none;
}

.first-action-btn {
    padding: 12px 24px;
    gap: 8px;

    width: 300px;
    height: 56px;

    /* theme/primary */
    background: var(--v-primary);
    box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
}

.first-action-btn > .v-btn__content > span {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 20px !important;
    line-height: 32px;
}

.explainer {  
  width: 100%;
  max-width: 960px;
  min-height: 400px;
  max-height: 50vh;
}

</style>
