/**
|--------------------------------------------------
|  PRODUCTION WEBPACK
|--------------------------------------------------
*/


const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production", // can be changed to development
  output: {
    filename: "[name].[contentHash].bundle.js", // brackets are there to not have the filename hardcoded
    path: path.resolve(__dirname, "dist") // path to the dist folder
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({ 
        template: "./src/template.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin() // makes it so that it only sticks to one build when running NPM RUN BUILD
  ],
  module: {
    rules: [ // rules for certain types of files ( .css, .js, .html, etc )
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});
