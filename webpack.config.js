//Used for path related things, creating absolute paths
const path = require("path");
//Deal with html files
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // What file to start at, since normally it looks for index.js
  entry: "./src/js/main.js",
  // Running in production mode to start, make it development mode to make the output cleaner
  //   mode: "development",
  mode: "production",
  //   devtool: "inline-source-map",
  output: {
    //the one file you wanted to create
    filename: "main.[hash].js",
    path: path.resolve(__dirname, "dist"),
    // clears dist folder every time
    clean: true,
  },
  plugins: [
    // by default it will take the html, add the hashed script tag name to the html that you wanted to create
    new HtmlWebpackPlugin({
      // this specifies what you wanted to build off of
      template: "./src/main.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /.+main\.scss$/,
        use: [
          "style-loader", //4. injects into dom
          "css-loader", //3. css --> common.js (converts to js)
          "postcss-loader", //2. post css stuff
          "sass-loader", //1. Sass --> css
        ],
      },
    ],
  },
};
