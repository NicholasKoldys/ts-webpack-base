import { resolve, join } from 'node:path';
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = import.meta.dirname;

const PROJECT_BUILD_VERSION = "0.0.1";

const webpackConfig = {
  mode: 'development',
  entry: './src/main.ts',
  devtool: 'inline-source-map',

  output: {
    filename: '[name].[contenthash:6].js',
    path: resolve(__dirname, 'dist'),
    clean: true,
    hashSalt: PROJECT_BUILD_VERSION, 
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },

  devServer: {
    static: {
      directory: join(__dirname, 'dist'),
    },
    hot: true,
    compress: true,
    port: 4000,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
    }),
  ]
};

export default webpackConfig;
