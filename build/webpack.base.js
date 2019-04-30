
/**
 * author: gleasonBian
 * date: 2019/4/30
 * 生产环境(prod)和开发环境(dev)通用配置
 */
const webpack = require('webpack');

// vue 核心解析插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// html 模板解析插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js', //入口
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 解决vender后面的hash每次都改变
    new webpack.HashedModuleIdsPlugin(),
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin(),
    // html 模板解析 插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
    })
  ],
};