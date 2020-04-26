const path = require('path')
const ansiRegex = require('ansi-regex')
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '~/assets/style/common/var.scss';
        `
      }
    }
  },
  chainWebpack: config => {
    // this path is specific to my project
    config.resolve.alias.set('~', path.join(__dirname, 'src'))
  },

  transpileDependencies: [ansiRegex, '@coreui/utils'],

  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-'
    }
  }
}
