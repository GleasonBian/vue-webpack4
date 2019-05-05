
/**
 * author: gleasonBian
 * date: 2019/4/30
 * 生产环境(prod)和开发环境(dev)通用配置
 */
const webpack = require('webpack');
const path = require('path')
// vue 核心解析插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// html 模板解析插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

// happypack 多进程加快编译速度
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js', //入口
  module: {
    rules: [
      { // 加载 vue 文件
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      { // 加载 css
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      { // 加载 图片
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 5000,
              // 分离图片至imgs文件夹
              name: "imgs/[name].[ext]",
            }
          },
        ]
      },
      { // 加载 字体
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      { // 加载 数据
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      { // 加载 数据
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
      {
        test: /\.js$/,
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
        //排除node_modules 目录下的文件
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
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
      favicon: './favicon.ico', // 添加小图标
      inject: true
    }),
    new HappyPack({
      //用id来标识 happypack处理类文件
      id: "happyBabel",
      //如何处理 用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    }),
    // 解决vender后面的hash每次都改变
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*'],
      },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.vue','.json'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
};