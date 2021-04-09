const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  devtool: "eval-source-map",
  mode: "development",
  entry: ["./src/utils.js", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "fin"),
    filename: "bundle.js",
    publicPath: "/fin/",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./index.html",
      publicPath: "/fin/",
      template: "./index-template.ejs",
      inject: "body",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, "fin/"),
    hot: true,
    compress: true,
    port: 9000,
    publicPath: "/fin/",
  },
};
