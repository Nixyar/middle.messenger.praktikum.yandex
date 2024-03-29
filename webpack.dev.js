const path = require('path');
const {merge} = require('webpack-merge');
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-source-map",
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 3000,
    open: true,
    hot: true
  },
});
