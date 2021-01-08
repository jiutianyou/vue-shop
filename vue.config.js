const  path = require('path')

function resolve(dir){
  return path.join(__dirname, dir)
}
  module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: false, // 提升编译速度
    css: {
    // 开启 CSS source maps?
      sourceMap: false,
      loaderOptions: {
        scss: {
          data: `@import "src/assets/css/variables.scss";`
        }
      }
    },
    configureWebpack: {
      resolve: {
        alias: { // 路径别名
          '@': resolve('src')
        }
      }
    },
    // chainWebpack: config => {
    //   const oneOfsMap = config.module.rule('scss').oneOfs.store
    //     oneOfsMap.forEach(item => {
    //       item
    //         .use('sass-resources-loader')
    //         .loader('sass-resources-loader')
    //         .options({
    //           // 全局变量文件路径，只有一个时可将数组省去
    //           resources: ['./src/assets/css/variables.scss']
    //         })
    //         .end()
    //     })
    //   }
    // }
    devServer: {
      disableHostCheck: true,
      host: 'localhost',
      port: 8090,
      // proxy: {
      // // 组织架构微服务代理
      //   '/api/shop': {
      //     target,
      //     changeOrigin: true,
      //     ws: true,
      //     pathRewrite: {
      //       '^/api/shop': '/shop'
      //     }
      //   }
      // }
    }
  }
