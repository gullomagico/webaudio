const path = require("path");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const buildPath = path.resolve(__dirname, "dist");

module.exports = (env, options) => {
  console.log("This is the webpack 'mode': " + options.mode);
  return {
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
      new InterpolateHtmlPlugin({
        PUBLIC_URL:
          options.mode === "production"
            ? "https://cafa.dev/WebAudio"
            : "localhost:8080",
      }),
    ],
  };
};
