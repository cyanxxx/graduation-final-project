const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function commonConfig(devMode) {
  return {
    entry: {
      'fetch-polyfill': 'whatwg-fetch',
      polyfill: 'babel-polyfill', // for ie8
      app: './src/index.tsx',
      // app: './src/test/index.tsx', // only for webpack test
      // vendor: [
      //     'react',
      //     'react-dom',
      //     'react-router-dom',
      // ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: devMode ? '[name].bundle.js' : '[name].bundle.min.js',
      chunkFilename: devMode ? '[name].bundle.js' : '[name].bundle.min.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: ['node_modules'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        STATIC: path.resolve(__dirname, 'static'),
        DATA: path.resolve(__dirname, 'src/config/api'),
        BULMA: path.resolve(__dirname, 'node_modules/bulma'),
        FONT: path.resolve(__dirname, 'static/font.js'),
      },
    },
    module: {
      rules: [
        {
          test: '/.html$/',
          use: [
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src'],
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                exclude: 'node_modules',
              },
            },
            'ts-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            devMode
              ? {
                  loader: 'style-loader',
                  options: {
                    singleton: true,
                  },
                }
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: devMode ? true : false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('precss'), require('autoprefixer')],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                data: `@import "~@/_varible.scss";`,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                limit: 8192,
                // publicPath: "static/",
                outputPath: 'dist/static/',
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minChunks: 2,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'all',
            name: 'vendors',
          },
          // default: {
          //     minChunks: 2,
          //     priority: -20,
          //     reuseExistingChunk: true,
          // },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        title: 'Caching',
        projectPath: 'static',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  };
}

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }],
  },
  devServer: {
    compress: true,
    port: 2563,
    open: true,
    hot: true,
    noInfo: true,
    progress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // also for hot updates
  ],
};

const prodConfig = {
  mode: 'production',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].min.css',
    }),
    new OptimizeCSSAssetsPlugin({}),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname),
      verbose: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: './static',
        ignore: ['.*'],
      },
    ]),
  ],
};

module.exports = (env, argv) => {
  console.log('---', env || argv.mode, '---');
  const devMode = argv.mode === 'development' || env !== 'production';
  const config = devMode ? devConfig : prodConfig;
  return merge(commonConfig(devMode), config);
};
