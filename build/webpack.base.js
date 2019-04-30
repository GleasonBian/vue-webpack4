
/**
 * author: gleasonBian
 * date: 2019/4/30
 * 生产环境(prod)和开发环境(dev)通用配置
 */
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
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
  ],
};