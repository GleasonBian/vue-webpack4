# vue-webpack4+

#### 一.项目搭建

1. 创建 vue-webpack4 文件夹

2. cmd 打开当前文件夹

3. 安装 webpack 四件套

   `npm install webpack webpack-cli webpack-dev-server webpack-merge --save-dev`

   + webpack@4.30.0
   + webpack-cli@3.3.1
   + webpack-dev-server@3.3.1
   + webpack-merge@4.2.1

4. 创建相应文件

   ![1556594159084](C:\Users\lzw\AppData\Roaming\Typora\typora-user-images\1556594159084.png)

#### 二. 配置 webpack

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

   

