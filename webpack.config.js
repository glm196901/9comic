const path = require('path');
const WebpackBar = require('webpackbar');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const postcssPx2rem = require('postcss-px2rem');
//const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './build'),
  },
  module:{
    rules:[
     {
    	// 用正则去匹配要用该 loader 转换的 CSS 文件
      	test:/\.css$/,
      	use:['style-loader','css-loader']
     }
   ],
  },
  devServer: {
    host:"localhost",
    port:9900,
    hot:true,
    open:true,
    quiet: true,
  },
};

