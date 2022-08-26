const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
  },
  assetsDir: 'static',
  runtimeCompiler: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
