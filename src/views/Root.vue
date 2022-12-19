<template lang="pug">
v-row.pt-12(style='background-color: #f7f7f7')
  v-flex(xs1)
  v-flex.text-left.ml-sm-8(xs10)
    #first(style='height: 78vh')
      h1#laboratory-name.sf {{ $t('laboratoryName') }}
      #laboratory-slogan
        h2.sf.text-md-h2.text-sm-h3(v-html='$t("laboratorySlogan")')
        span.d-flex.mt-11(row)
          v-btn#contact.no-scale(@click='$router.push("/proddg")', text, x-large, dark, depressed)
            span.sf.font-weight-regular Visit ProDDG service
            v-icon.pl-2 mdi-arrow-right-circle
          p.pl-8.pt-1.v-text
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
      div(v-if='section.type == "blocks"') 
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
            v-card-title.ml-sm-2.ml-xs-0.sf {{ card.title }}
            v-card-subtitle.ml-sm-2.ml-xs-0.mb-sm-2.mb-xs-0.sf {{ card.subtitle }}
      div(v-if='section.type == "publications"')
        .publication.mb-8(
          v-for='(publication, p_id) in section.publications',
          :key='p_id'
        ) 
          p.publication-title.mb-1.sf {{ publication.title }}
          input(
            v-model='isPublicationOpen[p_id]',
            type='checkbox',
            :id='"p-" + p_id',
            style='display: none'
          )
          label(:for='"p-" + p_id') 
            a.sf 
              span See More
              v-icon(v-if='!isPublicationOpen[p_id]', color='#95CEC9') mdi-menu-right
              v-icon(v-else, color='#95CEC9') mdi-menu-down
          transition(name="fadeHeight" mode="in-out")
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
    div 
      h2.section-title Contacts
      span.text-h5.sf E-Mail: d.ivankov@skoltech.ru
    //- router-link(to='/datasets') Datasets project
  v-flex(xs1)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class Root extends Vue {
  @AppStore.Mutation setDark!: (dark: boolean) => void

  isPublicationOpen: boolean[] = new Array<boolean>(
    // @ts-ignore
    this.$t('laboratory').filter(
      (e) => e.type == 'publications'
    )[0].publications.length
  ).fill(false)

  mounted() {
    document.title = this.$t('laboratoryName').toString();
    
    // Main page is always light
    this.setDark(false)
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
  background: #95cec9;
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
  font-size: 4rem;
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

.block {
  height: 560px;
  background: linear-gradient(
      180deg,
      rgba(59, 61, 60, 0) 46.88%,
      rgba(59, 61, 60, 0.25) 92.19%
    ),
    #ffffff;
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
    #ffffff;
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
    flex: 0 0 45%;
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

  color: #8de7df !important;

  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
}

#cards > .v-card > .v-image > .v-responsive__content > .v-card__subtitle {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 127%;
  /* or 15px */

  color: #5c5c5c;
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
.publication > * >  p.publication-description {
  font-size: 18px;
  line-height: 32px;
  /* or 178% */

  /* theme/text */
  color: var(--v-text);
}

.publication > label > a {
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  /* or 160% */

  /* theme/primary */
  color: #95cec9 !important;
}
.publication > div > a {
  font-size: 16px;
  text-decoration: none;
  color: #95cec9 !important;
}
</style>
