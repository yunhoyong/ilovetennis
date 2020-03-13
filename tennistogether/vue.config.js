const path = require('path')
const ansiRegex = require('ansi-regex')
module.exports = {
  // outputDir: '../ep-exclusive-service/src/main/resources/static',
  // devServer: {
  //   // publicPath: '/',
  //   port: 3002,
  //   proxy: {
  //     '^/api': {
  //       target: 'http://localhost:8106',
  //       ws: true,
  //       pathRewrite: {
  //         '^/exclusive/api' : '/api'
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `
  //         @import '~/assets/style/common/var.scss';
  //       `
  //     }
  //   }
  // },
  chainWebpack: config => {
    //this path is specific to my project
    config.resolve.alias.set('~', path.join(__dirname, 'src'))
  },

  transpileDependencies: [ansiRegex],

  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-'
    }
  }
}
