3. # vue-webpack4+

   #### 一.项目搭建
   
   > ```SPARQL
   > // 为节省安装时间,使用阿里定制的 cnpm 命令行工具代替默认的 npm
   > $ npm install -g cnpm --registry=https://registry.npm.taobao.org
   > // 检测cnpm版本，如果安装成功可以看到cnpm的基本信息。
   > $ cnpm -v
   > // 安装时使用 cnpm install 即可
   > $ cnpm install 包的名称
   > ```
   
   > ```java
   > // 当前电脑 node 和 npm 版本
   > cnpm@6.0.0 
   > npm@6.9.0
   > node@10.15.3 
   > ```
   
   1. 创建 vue-webpack4 文件夹
   
   2. cmd 打开 vue-webpack4 文件夹

   3. 初始化 npm，然后在本地安装 webpack 四件套，
   
      `npm init -y`
   
      `npm install webpack webpack-cli webpack-dev-server webpack-merge --save-dev`
   
      - webpack@4.30.0
      - webpack-cli@3.3.1
      - webpack-dev-server@3.3.1
      - webpack-merge@4.2.1
   
   4. 创建相应文件
   
      ![1556594159084](C:\Users\lzw\Pictures\1556594159084.png)
   
   #### 二. 基本 webpack 配置
   
   1. webpack.base.js
   
      ```javascript
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
      ```
   
   2. webpack.dev.js
   
      ```javascript
      /**
       * author: gleasonBian
       * date: 2019/4/30
       * 开发环境配置
       */
      const merge = require('webpack-merge');
      const common = require('./webpack.base.js');
      const path = require('path');
      
      module.exports = merge(common, {
        devtool: 'inline-source-map',
        devServer: { // 开发服务器
          contentBase: '../dist'
        },
        output: { // 输出
          filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
          path: path.resolve(__dirname, '../dist')
        },
        module: {},
        mode: 'development',
      });
      ```
   
   3. webpack.prod.js
   
      ```javascript
      /**
       * author: gleasonBian
       * date: 2019/4/30
       * 生产环境配置
       */
      const path = require('path');
      // 合并配置文件
      const merge = require('webpack-merge');
      const common = require('./webpack.base.js');
      
      module.exports = merge(common, {
        module: {},
        plugins: [],
        mode: 'production',
        output: {
          filename: 'bundle/[name].[contenthash].js', //contenthash 若文件内容无变化，则contenthash 名称不变
          path: path.resolve(__dirname, '../dist')
        },
      });
      ```
   
   #### 三. 基本 vue 配置
   
   1. 安装 vue cli
   
      `npm install -g @vue/cli`
   
   2. 安装 vue
   
      `npm install vue`
   
      - vue@2.6.10
   
   3. 安装 vue 核心解析插件
   
      `npm install vue-loader vue-template-compiler --save-dev`
   
      - vue-loader@15.7.0
      - vue-template-compiler@2.6.10
   
   4. 安装 html 模板解析插件
   
      `npm i html-webpack-plugin --save-dev`
   
      - html-webpack-plugin@3.2.0
   
   5. 设置 入口文件 project/src/main.js
   
      ```javascript
      import Vue from 'vue'
      
      import App from './App.vue'
      
      new Vue({
        el: '#app',
        render: h => h(App),
      });
      
      ```
   
   6. 配置主组件 project/src/App.vue
   
      ```javascript
      <template>
        <div id="app">
          hello world
        </div>
      </template>
      
      <script>
      export default {
        name: 'app'
      }
      </script>
      
      <style scoped>
      #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        transform: rotate(0deg);
      }
      </style>
      ```
   
   7. indexhtml
   
      ```javascript
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Suporka Vue App</title>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
      ```
   
   8. 由于在开发和生产环境中都需要对vue文件的解析, 因此 解析 vue 配置在 webpack.base.js 中
   
      ```javascript
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
      ```
   
   9. package.json
   
      ```javascript
      {
        "name": "vue-webpack4",
        "version": "1.0.0",
        "description": "基于 webpack4+ 的 vue 项目",
        "author": "Gleason <bianliuzhu@gmail.com>",
        "private": true,
        "dependencies": {
          "vue": "^2.6.10"
        },
        "devDependencies": {
          "html-webpack-plugin": "^3.2.0",
          "vue-loader": "^15.7.0",
          "vue-template-compiler": "^2.6.10",
          "webpack": "^4.30.0",
          "webpack-cli": "^3.3.1",
          "webpack-dev-server": "^3.3.1",
          "webpack-merge": "^4.2.1"
        },
        "scripts": {
          "start": "webpack-dev-server --hot --open --config build/webpack.dev.js",
          "build": "webpack --config build/webpack.prod.js"
        },
        "repository": {
          "type": "git",
          "url": "git+https://github.com/GleasonBian/vue-webpack4.git"
        },
        "keywords": [],
        "license": "ISC",
        "bugs": {
          "url": "https://github.com/GleasonBian/vue-webpack4/issues"
        },
        "homepage": "https://github.com/GleasonBian/vue-webpack4#readme"
      }
      ```
   
   10. npm start 启动项目
   
       ![1556610968537](C:\Users\lzw\AppData\Roaming\Typora\typora-user-images\1556610968537.png)
   
   11. npm run build 打包项目 (生成dist文件夹)
   
       ![1556611166080](C:\Users\lzw\AppData\Roaming\Typora\typora-user-images\1556611166080.png)
   
   #### 四. 资源管理
   
   1. 加载 css
   
      `npm install --save-dev style-loader css-loader`
   
      - style-loader@0.23.1
      - css-loader@2.1.1
   
   2. 加载 图片，字体
   
      `cnpm install --save-dev file-loader`
   
      - file-loader@3.0.1
   
   3. 加载数据
   
      `cnpm install --save-dev csv-loader xml-loader`
   
      - xml-loader@1.2.1
      - csv-loader@3.0.2
   
   4. 配置 webpack.base.js
   
      ```javascript
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
      ```
   
   #### 五. 管理输出
   
   1. 在每次构建前清理 `/dist` 文件夹，安装 [`clean-webpack-plugin`](https://www.npmjs.com/package/clean-webpack-plugin) 插件
   
      `cnpm install clean-webpack-plugin --save-dev`
   
      - clean-webpack-plugin@2.0.1
   
   2. 分离 css
   
      > webpack4 中使用 mini-css-extract-plugin 插件来分离 css。
   
      安装 mini-css-extract-plugin 插件
   
      `cnpm install mini-css-extract-plugin --save-dev`
   
      - mini-css-extract-plugin@0.6.0
   
   3. 配置 webpack.prod.js
   
      ```javascript
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
      });使用 happypack 多进程加快编译速度,同时也需要安装 babel 两件套
      ```
   
   #### 六.  使用 happypack 多进程加快编译速度 
   
   > 同时也需要安装 babel 两件套
   
   1. 安装 babel-core
   
      `cnpm install babel-core --save-dev`
   
      - babel-core@6.26.3
   
      `cnpm install babel-loader@7.1.5 --save-dev`
   
      - babel-loader@7.1.5
   
      `cnpm install happypack --save-dev`
   
      - happypack@5.0.1
   
   2. 因为 happypack 开发环境生产环境都需要用到,所以在 webpack.base.js 中配置
   
      ```javascript
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
      
      // happypack 多进程加快编译速度
      const HappyPack = require('happypack');
      const os = require('os');
      const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
      
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
        ],
      };
      ```
   
   3. 分离不常变化的文件，如 node_modules 下引用的库(配置 webpack.prod.js)
   
      ```javascript
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
      ```
   
      如此配置，则打包的 js 文件夹中会多一个 vendor.js
   
   4. 压缩CSS和JS代码
   
      安装 optimize-css-assets-webpack-plugin 和 uglifyjs-webpack-plugin 插件
   
      `cnpm install  optimize-css-assets-webpack-plugin --save`
   
      +  optimize-css-assets-webpack-plugin@5.0.1 › cssnano@4.1.10 › postcss@^7.0.0(7.0.16)
   
      `cnpm install uglifyjs-webpack-plugin --save-dev`
   
      + uglifyjs-webpack-plugin@2.1.2
   
      配置 webpack.prod.js 文件
   
      ```javascript
      
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
            // 压缩JS (暂不压缩)
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
      ```
   
      执行 npm run build 命令 打包 查看输出
   
   5. package.json 
   
      ```json
      {
        "name": "vue-webpack4",
        "version": "1.0.0",
        "description": "基于 webpack4+ 的 vue 项目",
        "author": "Gleason <bianliuzhu@gmail.com>",
        "private": true,
        "dependencies": {
          "vue": "^2.6.10",
          "vue-loader": "^15.7.0"
        },
        "devDependencies": {
          "babel-core": "^6.26.3",
          "babel-loader": "^7.1.5",
          "clean-webpack-plugin": "^2.0.1",
          "css-loader": "^2.1.1",
          "csv-loader": "^3.0.2",
          "file-loader": "^3.0.1",
          "happypack": "^5.0.1",
          "html-webpack-plugin": "^3.2.0",
          "mini-css-extract-plugin": "^0.6.0",
          "optimize-css-assets-webpack-plugin": "^5.0.1",
          "style-loader": "^0.23.1",
          "uglifyjs-webpack-plugin": "^2.1.2",
          "vue-template-compiler": "^2.6.10",
          "webpack": "^4.30.0",
          "webpack-cli": "^3.3.1",
          "webpack-dev-server": "^3.3.1",
          "webpack-merge": "^4.2.1",
          "xml-loader": "^1.2.1"
        },
        "scripts": {
          "start": "webpack-dev-server --hot --open --config build/webpack.dev.js",
          "build": "webpack --config build/webpack.prod.js"
        },
        "repository": {
          "type": "git",
          "url": "git+https://github.com/GleasonBian/vue-webpack4.git"
        },
        "keywords": [],
        "license": "ISC",
        "bugs": {
          "url": "https://github.com/GleasonBian/vue-webpack4/issues"
        },
        "homepage": "https://github.com/GleasonBian/vue-webpack4#readme"
      }
      ```

#### 六.  静态文件打包

1. 安装 copy-webpack-plugin 

   `cnpm install copy-webpack-plugin --save-dev`

   - copy-webpack-plugin@5.0.3

2. 配置 webpack.base.js

   ```javascript
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
       extensions: ['.js', '.vue'],
       alias: {
           vue: 'vue/dist/vue.esm.js',
           '@': resolve('src'),
       },
     },
   };
   ```

3. 配置开发环境请求代理 webpack.dev.js

   ```javascript
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
   ```

4. 安装 axios

   `cnpm install --save axios vue-axios`

   + axios@0.18.0
   + vue-axios@2.1.4

5. src/main.js 中配置使用

   ```javascript
   import axios from 'axios'
   import VueAxios from 'vue-axios'
   Vue.use(VueAxios, axios)
   ```

#### 七. 配置 vue-router

1. 安装 vue-router

   `cnpm install vue-router --save`

2. 配置 使用 vue-router

   在 src 目录下创建 router.js

   ```javascript
   import Vue from 'vue'
   import Router from 'vue-router'
   import {resolve} from 'path';
   Vue.use(Router)
   
   const login = resolve => require(['@/components/login'], resolve);
   const router = new Router({
     mode: 'history',
     routes: [
       {
         path: '/login',
         name: 'login',
         component: login,
       },
     ]
   })
   export default router
   ```

3. 在 src 目录下创建 components 文件夹

4. 在 src/components目录下创建 login.vue

   ```javascript
   <template> 
   <div>
     <button @click="clickHandle">23232</button>
   </div>
   </template>
   
   <script>
   export default {
     name: "",
     components: {},
     data() {
       return {};
     },
     computed: {},
   
     watch: {},
   
     methods: {
       clickHandle(){
         // 请替换自己的接口
         this.axios.post('/api/wxsupplier/supplierProduct/listData').then(res=>{
           console.log(res)
         }).catch(err=>{
           console.log(err)
         })
       }
     },
     /**
      *
      * 生命周期
      *
      */
     created() {},
     mounted() {}
   };
   </script>
   <style  scoped>
   </style>
   ```
   
5. 调整 src/App.vue 文件

   ```php+HTML
   <template>
     <div id="app">
      <router-view/>
     </div>
   </template>
   
   <script>
   export default {
     name: 'app',
     data(){
       return {
       }
     },
   }
   </script>
   
   <style scoped>
   
   </style>
   
   ```

6. 启动项目 npm start 查看运行效果