const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin(
    {
      title: 'Development',
      template: './client/index.html'
    }
    )],
  devServer: {
    static: {
      publicPath: '/dist',
      directory: path.join(__dirname, './dist'),
    }, 
    proxy: {
      '/api': 'http://localhost:3000',
    },
  }, 
  mode: process.env.NODE_ENV,
  module: { 
    rules: [
      { 
        test: /\.jsx?/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.jpeg/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          //creates style nodes from js strings
          'style-loader',
          //translates css into common js
          'css-loader',
          //compiles sass to css
          'sass-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

};