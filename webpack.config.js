const path = require("path");
var fs = require("fs");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const buildPath = path.resolve(__dirname, "dist");

// Set up html webpack plugin for every .pug file in pages folder
let htmlPagesNames = fs.readdirSync("./src/pages");
let multipleHtmlPlugins = htmlPagesNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: "src/pages/" + name,
    filename: name.slice(0, -4) + ".html",
    chunks: ["main", "page1"],
  });
});

module.exports = (env, options) => {
  console.log("This is the webpack 'mode': " + options.mode);
  return {
    entry: {
      main: "./src/main",
      page1: "./src/js/page1",
    },
    output: {
      path: buildPath,
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
        chunks: ["main"],
      }),
      new InterpolateHtmlPlugin({
        PUBLIC_URL:
          options.mode === "production"
            ? "https://cafa.dev/WebAudio"
            : "http://localhost:8080",
      }),
    ].concat(multipleHtmlPlugins),
  };
};
