/**
 * author: gleasonBian
 * date: 2019/4/30
 * 生产环境配置
 */
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
// 打包之前清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 分离CSS插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(common, {
  module: {},
  plugins: [
    new CleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: 'css/[id].[hash].css'
    }),
  ],
  rules: [
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            publicPath: '../'
          }
        },
        'css-loader',
        'style-loader'
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            limit: 5000,
            name: "imgs/[hash].[ext]",
          }
        },
        // 图片压缩
        {
          loader: 'image-webpack-loader',
          options: {
            //   bypassOnDebug: true,
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            }
          },
        },
      ]
    },
  ],
  output: {
    filename: 'bundle/[name].[contenthash].js', //contenthash 若文件内容无变化，则contenthash 名称不变
    path: path.resolve(__dirname, '../dist')
  },
});