/**
 * author: gleasonBian
 * date: 2019/4/30
 * 开发环境配置
 */
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
    hot: true, // 启用 模块热替换
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true, // 一切服务都启用 gzip 压缩
    host: "localhost", // 指定使用一个 host。默认是 localhost
    port: 8888, // 端口
    open: true, // 自动打开浏览器
    proxy: {
      "/api": { // demo 环境
        target: 'https://wxmall.demo.sjgtw.com', //"http://wnktmw.natappfree.cc",https://wxmall.demo.sjgtw.com
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/api": ""
        }
      },
      "/dev": { // 开发环境
        target: "http://192.168.1.242:23338", //http://192.168.1.242:23338
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/dev": ""
        }
      }
    },
    quiet: true, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: {
      poll: true,
    }
  },
  output: { // 输出
    filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 5000,
              name: 'imgs/[name].[ext]',
              // publicPath: '../'
            },
          },
        ],
      },
    ],
  },
  mode: 'development',
});