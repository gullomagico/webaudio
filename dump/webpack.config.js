const path = require("path");
var fs = require("fs");
const autoprefixer = require("autoprefixer");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const buildPath = path.resolve(__dirname, "dist");

// Create an HTML page for every directory in "src/pages"
let pages = fs.readdirSync("./src/pages");
let multipleHtmlPlugins = pages.map((name) => {
  return new HtmlWebpackPlugin({
    title: name + " - WebAudio",
    template: "src/pages/" + name + "/index.pug",
    filename: name + "/index.html",
    chunks: ["main", name + "/index"],
  });
});
const multipleEntries = pages.reduce(
  (o, key) => ({
    ...o,
    [key + "/index"]: "./src/pages/" + key + "/index.js",
  }),
  {
    main: "./src/main",
  }
);

module.exports = (env, options) => {
  console.log("This is the webpack 'mode': " + options.mode);
  return {
    entry: multipleEntries,
    output: {
      path: buildPath,
    },
    resolve: {
      alias: {
        "@root": __dirname,
      },
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
              root: path.resolve(__dirname, "src/includes"),
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
            ? "https://cafa.dev/webaudio"
            : "http://localhost:8080",
      }),
    ].concat(multipleHtmlPlugins),
  };
};
