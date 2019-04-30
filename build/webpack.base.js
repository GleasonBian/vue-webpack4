
/**
 * author: gleasonBian
 * date: 2019/4/30
 * 生产环境(prod)和开发环境(dev)通用配置
 */
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js', //入口
  module: {
    rules: []
  },
  plugins: [
    // 解决vender后面的hash每次都改变
    new webpack.HashedModuleIdsPlugin(),
  ],
};