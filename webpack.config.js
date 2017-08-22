const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css/, loader: 'style-loader!css-loader', exclude: /node_modules/ },
      { test: /\.(p?ng|jpg)$/, exclude: /node_modules/, loader: 'url-loader?limit=100000&name=./imgs/[hash].[ext]' },
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}
