const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssPresetEnv = require("postcss-preset-env");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 设置环境变量
process.env.NODE_ENV = "develepment";
// process.env.NODE_ENV = 'production'

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [PostcssPresetEnv()],
              name: "main_[hash:10].[ext]",
            },
          },
        ],
      },

      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url-loader",
        options: {
          // 资源8~12kb
          limit: 8 * 1024,
          esModule: false,
          name: "static_[hash:10].[ext]", // 原拓展名
        },
      },
      {
        test: /\.html$/, // 引入img标签解释，url-loader处理
        loader: "html-loader",
      },
      {
        exclude: /\.(js|html|css|less|jpg|png|gif|svg)/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "development",
  // devServer
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    open: true,
    port: 3333,
  },
};
