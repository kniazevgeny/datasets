module.exports = {
  devServer: {
    port: 8080,
    hot: true,
  },
  assetsDir: 'datasets',
  publicPath: process.env.VUE_APP_MODE !== 'dev'
    ? 'https://kniazevgeny.github.io/'
    : '/',
  runtimeCompiler: true,
  // lintOnSave: process.env.NODE_ENV !== 'production',
  pluginOptions: {
    vuetify: {
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },
}
