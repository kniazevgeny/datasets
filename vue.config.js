module.exports = {
  devServer: {
    port: 8080,
    hot: true,
  },
  assetsDir: 'proddg',
  publicPath: process.env.VUE_APP_MODE !== 'dev'
    ? '/'
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
