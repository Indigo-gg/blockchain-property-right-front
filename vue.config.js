const path = require('path')
const webpack = require('webpack')

// 定义gzip与压缩文件类型
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/jquery.min.js'
  ]
}


// vue.config.js
const vueConfig = {
  publicPath: process.env.BASE_URL,
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate
      }),
      new webpack.LoaderOptionsPlugin({
        option: {
          rules:
            [
              {
                test: /.vue$/,
                loader: 'vue-loader'
              },
              {
                test: /\.(glsl)$/,
                use: 'webpack-glsl-loader'
              }
            ]
        }
      }),
       new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    externals: isProd ? assetsCDN.externals : {}
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
    config.module
      .rule('svg')
      // 这里配置的icon的存放位置
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 9090,
    proxy: {
      '/api': {
        target: 'http://60.205.225.137:8087',
        ws: false,
        changeOrigin: true
      }
    },
    overlay: {
      warnings: false,
      errors: false
    }
    // lintOnSave: false
  },
  // disable source map in production
  productionSourceMap: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}
// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
