<template lang="pug">
v-row.pt-12
  v-flex(xs1)
  v-flex.text-left.ml-sm-8(xs10)
    v-row(style='position: relative; z-index: 99')
      v-spacer
      ThemeSwitcher
    #first(style='height: 78vh')
      h1#laboratory-name.sf {{ $t('laboratoryName') }}
      #laboratory-slogan
        h2.sf.text-md-h2.text-sm-h3(v-html='$t("laboratorySlogan")')
        span.d-flex.mt-11(
          :style='$vuetify.breakpoint.mobile ? "flex-direction: column" : "flex-direction: row"'
        )
          v-btn#contact.no-scale(
            @click='$router.push("/proddg")',
            text,
            x-large,
            dark,
            depressed
          )
            span.sf.font-weight-regular Visit ProDDG service
            v-icon.pl-2 mdi-arrow-right-circle
          p.pl-xs-0.pl-sm-8.pt-1.v-text
            span Browse mutations
            br
            span and analyze datasets
    .pt-11.mt-11.pb-11.mb-11(
      v-for='(section, s_id) in $t("laboratory")',
      :key='s_id'
    )
      h2.sf.section-title.pb-10 {{ section.title }}
      div(v-if='section.type == "paragraphs"') 
        p.sf.paragraph(
          v-for='paragraph in section.paragraphs',
          v-html='paragraph'
        )
      .blocks(v-if='section.type == "blocks"') 
        v-row(dense)
          v-col.pr-10.justify-space-between(
            v-for='(block, b_id) in section.blocks',
            :key='b_id'
          )
            v-card.block(flat)
              v-img.white--text.align-end
              v-card-title.block-title {{ block.title }}
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
              a.no-link-decoration(:href='card.url' target="_blank") {{ card.title }}
            v-card-subtitle.ml-sm-2.ml-xs-0.mb-sm-2.mb-xs-0.sf {{ card.subtitle }}
      div(v-if='section.type == "publications"')
        .publication.mb-8(
          v-for='(publication, p_id) in section.publications',
          :key='p_id'
        ) 
          p.publication-title.mb-1.sf {{ publication.title }}
          div  
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
        span(v-show='isPublicationOpen[0]') {{ isPublicationOpen }}
      div(v-if='section.type == "annual"')
        .year(v-for='(year, y_id) in getYearsForAnnual(section.data)')
          input(
            v-model='isYearOpen[y_id]',
            type='checkbox',
            :id='"a-" + y_id',
            style='display: none'
          )
          label(:for='"a-" + y_id') 
            span()
              span.sf.pt-6 {{ year }}
              v-icon.pt-5(x-large, v-if='!isYearOpen[y_id]') mdi-menu-right
              v-icon.pt-5(x-large, v-else) mdi-menu-down
          transition(name='fadeHeight', mode='in-out')
            div
              div.pt-5.pb-2(v-show='isYearOpen[y_id]' v-for='thesis in getAnnualByYear(section.data, year)')
                .thesis-title {{thesis.title}}
                .thesis-description {{thesis.description}}

    div 
      h2.section-title.pb-10 Contacts
      span 
        span e-mail:&nbsp;
        a(href='mailto:d.ivankov@skoltech.ru') d.ivankov@skoltech.ru
      br
      span 
        span For directions on how to reach us, please see&nbsp;
        a(href='https://www.skoltech.ru/en/about/contacts/' target="_blank") here. 
    //- router-link(to='/datasets') Datasets project
  v-flex(xs1)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

@Component({
  components: {
    ThemeSwitcher,
  },
})
export default class Landing extends Vue {
  isPublicationOpen: boolean[] = new Array<boolean>(
    // @ts-ignore
    this.$t('laboratory').filter(
      (e) => e.type == 'publications'
    )[0].publications.length
  ).fill(false)

  isYearOpen: boolean[] = Array.prototype.concat(
    true,
    ...new Array<boolean>(
    // @ts-ignore
      this.$t('laboratory').filter((e) => e.type == 'annual')[0].data.length - 1
    ).fill(false)
  )

  getYearsForAnnual(data: object[]) {
    // @ts-ignore
    const years = new Set(data.map((el) => el.year))
    return [...years.values()]
  }

  getAnnualByYear(data, year) {
    return data.filter((el) => el.year == year)
  }

  mounted() {
    document.title = this.$t('laboratoryName').toString()
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
  background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(38, 38, 39, 0.5) 85%, rgba(21, 22, 23, 0.9) 100%);
}
#cards > .v-card.theme--dark > .v-image > .v-responsive__sizer {
  background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(31, 40, 61, 0.5) 85%, rgba(13, 22, 33, 0.9) 100%);
}
#cards > * > .v-image > .v-image__image {
  filter: grayscale(1);
}
#cards > * > .v-image > .v-responsive__content {
  /* override default width:768px; */
  width: 100% !important;
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
#laboratory-name {
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 127%;
  /* identical to box height, or 51px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;

  color: var(--v-text);
}

#laboratory-slogan {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  align-self: center;
  /* align-items: center; */
  height: 70vh;
}

#laboratory-slogan > h2 {
  white-space: pre-line;
  font-style: normal;
  font-weight: 700;
  line-height: 115%;
  /* or 74px */

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;

  color: var(--v-text);

  text-shadow: -2px 2px 8px rgba(0, 0, 0, 0.25);
}

#contact {
  padding: 12px 24px;
  gap: 8px;

  width: 300px;
  height: 56px;

  /* theme/primary */
  background: var(--v-primary);
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

#contact > .v-btn__content > span {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px !important;
  line-height: 32px;
}

.section-title {
  font-style: normal;
  font-weight: 800;
  font-size: min(4rem, 48px);
  line-height: 127%;
  /* or 81px */

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;

  /* theme/text */
  color: var(--v-text);
  text-shadow: -2px 2px 8px rgba(0, 0, 0, 0.25);
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

.blocks > .row {
  overflow-x: auto;
    max-width: 90vw;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.blocks > .row > .col {
  min-width: 300px;
}

.block {
  height: 560px;
  background: linear-gradient(
      180deg,
      rgba(59, 61, 60, 0) 46.88%,
      rgba(59, 61, 60, 0.25) 92.19%
    ),
    var(--v-accent);
  box-shadow: -2px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.block:hover {
  transition: all ease-in-out 0.4s;
  background: linear-gradient(
      180deg,
      rgba(149, 203, 206, 0) 46.88%,
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

  color: var(--v-primary) !important;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
}

#cards > .v-card > .v-image > .v-responsive__content > .v-card__title > a {
  text-decoration: none;
}

#cards > .v-card:hover > .v-image > .v-responsive__content > .v-card__title > a {
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
  color: var(--v-primary) !important;
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
</style>
