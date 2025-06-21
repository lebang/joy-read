import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from '@rspack/cli';
import rspack from '@rspack/core';
import { VueLoaderPlugin } from 'vue-loader';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathResolve = (dir) => path.resolve(__dirname, dir)

/** @type {import('@rspack/cli').Configuration} */

export default defineConfig({
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3001,
    client: {
      overlay: false,
    }
  },
  plugins: [
    new VueLoaderPlugin(),  
    new rspack.HtmlRspackPlugin({
      template: './default.html',
      title: 'Joy Read',
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
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
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
          svgoConfig: {}
        }
      },
    ],
  },
})