import { resolve, join } from 'node:path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import { DeclarationWebpackPlugin, moduleType } from '@nicholaskoldys/declaration-webpack-plugin';

const __dirname = import.meta.dirname;

const PROJECT_BUILD_VERSION = "0.0.1";

const webpackConfig = {
  mode: 'development',
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  experiments: {
    outputModule: true,
  },

  output: {
    filename: '[name].[contenthash:6].min.js',
    library: {
      type: 'modern-module',
    },
    path: resolve(__dirname, 'dist'),
    clean: true,
    hashSalt: PROJECT_BUILD_VERSION, 
  },

  infrastructureLogging: {
    level: 'verbose',
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
    extensionAlias: {
      '.js': ['.js', '.ts', '.jsx'],
    },
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
        test: /\.m?tsx?$/,
        use: [ 
          { 
            loader: 'ts-loader', 
            options: { 
              configFile: resolve(__dirname, './src/tsconfig.bundler.json') 
            }
          },
        ],
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
    new DeclarationWebpackPlugin({
      moduleName: "main",
      moduleType: moduleType.esm,
      outputFile:'main.d.ts',
      isFileCommented: true,
    }),
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
  ],
};

export default webpackConfig;
