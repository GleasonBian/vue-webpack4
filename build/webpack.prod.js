
/**
 * author: gleasonBian
 * date: 2019/4/30
 * 生产环境配置(prod)
 */

const path = require("path");
// 合并配置文件
const merge = require("webpack-merge");
const common = require("./webpack.base.js");
// 打包之前清除文件
const CleanWebpackPlugin = require("clean-webpack-plugin");
// 压缩CSS插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 压缩CSS和JS代码
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = merge(common, {
  optimization: {
    // 分离chunks
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    },
    minimizer: [
      // 压缩JS
      // new UglifyJsPlugin({
        // uglifyOptions: {
        //   compress: {
        //     warnings: false, // 去除警告
        //     drop_debugger: true, // 去除debugger
        //     drop_console: true // 去除console.log
        //   },
        // },
        // cache: true, // 开启缓存
        // parallel: true, // 平行压缩
        // sourceMap: false // 如果需要JS源映射，请设置为true
      // }),
      // 压缩css
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 可以在此处指定publicPath
              // 默认情况下 在 webpackOptions.output 中使用 publicPath 
              publicPath: "../"
            }
          },
          "css-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 5000,
              name: "imgs/[hash].[ext]"
            }
          },
          // 图片压缩
          {
            loader: "image-webpack-loader",
            options: {
              //   bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css"
    })
  ],
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist")
  }
});
