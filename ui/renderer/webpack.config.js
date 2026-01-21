
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: { path: path.resolve(__dirname, 'build'), filename: 'bundle.js' },
  resolve: { extensions: ['.js', '.jsx'] },
  module: { rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader' } }, { test: /\.css$/, use: ['style-loader','css-loader'] }] },
  plugins: [ new HtmlWebpackPlugin({ template: path.join(__dirname, 'public_index.html') }) ],
  devServer: { port:3000, static: { directory: path.join(__dirname, 'build') }, hot:true, open:false }
};
