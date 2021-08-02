const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const buildPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: buildPath,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.pug$/,
        use: {
          loader: "pug-loader",
          options: {
            pretty: true,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // Definitions...
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Home - WebAudio",
      template: "src/index.pug",
    }),
    new HtmlWebpackPlugin({
      title: "Hello",
      filename: "pages/test.html",
      template: "src/pages/page1.pug",
    }),
  ],
};
