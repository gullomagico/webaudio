const path = require("path");
var fs = require("fs");
const autoprefixer = require("autoprefixer");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const buildPath = path.resolve(__dirname, "dist");

// Set up html webpack plugin for every .pug file in pages folder
let htmlPagesNames = fs.readdirSync("./src/pages");
let multipleHtmlPlugins = htmlPagesNames.map((name) => {
  return new HtmlWebpackPlugin({
    title: name.slice(0, -4) + " - WebAudio",
    template: "src/pages/" + name,
    filename: name.slice(0, -4) + ".html",
    chunks: ["main", name.slice(0, -4)],
  });
});

module.exports = (env, options) => {
  console.log("This is the webpack 'mode': " + options.mode);
  return {
    entry: {
      main: "./src/main",
      Oscillator: "./src/js/Oscillator",
      Filters: "./src/js/Filters",
    },
    output: {
      path: buildPath,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(css|sass|scss)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: { plugins: ["autoprefixer"] },
              },
            },
            "sass-loader",
          ],
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
        {
          test: /\.(ico)/,
          use: {
            loader: "file-loader?name=assets/[name].[ext]",
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
