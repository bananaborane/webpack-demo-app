/**
|--------------------------------------------------
|  DEVELOPEMENT WEBPACK
|--------------------------------------------------
*/



const path = require("path"); // inherent with NodeJS
const common = require("./webpack.common");
const merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development", // can be changed to production
  output: {
    filename: "[name].bundle.js", // [name] is for dynamic file naming
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    })
  ],
  module: {
    rules: [ // rules for certain types of files ( .css, .html, .js, etc )
      {
        test: /\.scss$/, 
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});
