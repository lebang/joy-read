import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from '@rspack/cli'
import rspack from '@rspack/core'
import { VueLoaderPlugin } from 'vue-loader'
import { devtools } from 'vue'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathResolve = (dir) => path.resolve(__dirname, dir)

/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'chunk-common', // 打包后的文件名
          chunks: 'initial', // 
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          reuseExistingChunk: true
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        elementPlus: {
          name: 'chunk-element-plus',
          test: /[\\/]node_modules[\\/]element-plus[\\/]/,
          chunks: 'initial',
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  output: {
    clean: true,
    // clean:{
    //   keep: 'ignored/dir', // keep these assets under 'dist/ignored/dir'.
    // },
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
    cssFilename: 'css/[name].[contenthash].css',
    cssChunkFilename: 'css/[name].[contenthash].css',
    assetModuleFilename: 'asset/[name].[contenthash].[ext]',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: false,
  devServer: {
    port: 3001,
    client: {
      overlay: false,
    },
    hot: false,
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './default.html',
      title: 'Joy Read',
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
  resolve: {
    alias: {
      '@src': pathResolve('src'),
      '@components': pathResolve('src/components'),
      '@views': pathResolve('src/views'),
      '@routes': pathResolve('src/routes'),
      '@utils': pathResolve('src/utils'),
      '@apis': pathResolve('src/apis'),
      '@store': pathResolve('src/store'),
      '@assets': pathResolve('src/assets'),
      '@setup': pathResolve('src/setup'),
      '@directives': pathResolve('src/directives'),
    },
    extensions: ['.js', '.css', '.vue'],
  },
  experiments: {
    css: true,
  },
  module: {
    parser: {
      javascript: {
        exportsPresence: 'auto',
        url: 'relative',
      },
    },
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.less$/,
        loader: 'less-loader',
        type: 'css',
      },
      {
        test: /\.svg$/,
        loader: 'rspack-svg-loader/vue',
        options: {
          svgoConfig: {},
        },
      },
      {
        test: /\.worker\.(js|ts)/i,
        use: [{
          loader: 'comlink-loader',
          options: {
            singleton: true,
          }
        }]
      }
    ],
  },
})
