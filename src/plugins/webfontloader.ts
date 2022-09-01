/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  /* eslint-disable-next-line */
  const webFontLoader = require(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      families: ['Inter:100,300,400,500,700,900&display=swap'],
    },
  })
}
