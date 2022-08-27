const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    hot: true,
  },
  assetsDir: 'static',
  runtimeCompiler: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  pluginOptions: {
    vuetify: {},
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
});
