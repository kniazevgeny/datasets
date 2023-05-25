<template lang="pug">
v-row.pt-12
  v-flex(xs1)
  v-flex.text-left.px-4.px-lg-12(xs10)
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
    ServiceDescription.pt-12(itemsPath='laboratory')
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

import ServiceDescription from '@/components/ServiceDescription.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

@Component({
  components: {
    ThemeSwitcher,
    ServiceDescription
  },
})
export default class Landing extends Vue {
  mounted() {
    document.title = this.$t('laboratoryName').toString()
  }
}
</script>
<style>
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

.section-title.h2 {
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
</style>
