const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './Demo/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin(
    {
      title: 'Development',
      template: './Demo/client/index.html'
    }
  )],
  devServer: {
    static: {
      publicPath: '/dist',
      directory: path.join(__dirname, './dist'),
    }, 
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000', secure: false,
      },
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
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          // loader: ['@svgr/webpack', 'url-loader', 'file-loader'],
          loader: 'file-loader',
          options: {
            name: 'public/icons/[name].[ext]'
          }
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

};