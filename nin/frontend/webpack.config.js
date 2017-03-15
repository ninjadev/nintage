const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './app/scripts/app',
    dark: './app/dark',
    light: './app/light'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /app\/lib/],
        use: ['ng-annotate-loader', 'babel-loader', 'eslint-loader']
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test:/\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles/[name].css"),
    new CopyWebpackPlugin([
      {from: 'app/index.html'},
      {from: 'app/views/', to: 'views'},
      {from: 'app/images/', to: 'images'},
      {from: 'app/fonts/', to: 'fonts'},
    ]),
  ],
  devtool: 'source-map'
};
