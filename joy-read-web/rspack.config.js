import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from '@rspack/cli';
import { VueLoaderPlugin } from 'vue-loader';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathResolve = (dir) => path.resolve(__dirname, dir)

export default defineConfig({
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      '@src': pathResolve('src'),
      '@components': pathResolve('src/components'),
      '@views': pathResolve('src/views'),
      '@routes': pathResolve('src/routes'),
      '@utils': pathResolve('src/utils'),
      '@apis': pathResolve('src/apis'),
      '@store': pathResolve('src/store'),
    },
  },
  module: {
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
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        loader: 'less-loader',
        type: 'css',
      },
    ],
  },
})