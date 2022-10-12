const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './Demo/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './Demo/client/index.html',
      favicon: './Demo/client/components/assets/favicon.ico',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      publicPath: '/dist',
      directory: path.join(__dirname, './dist'),
    },
    proxy: {
      '/': 'https://dacheql2.herokuapp.com/graphql2',
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
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          // loader: ['@svgr/webpack', 'url-loader', 'file-loader'],
          loader: 'file-loader',
          options: {
            name: 'public/icons/[name].[ext]',
          },
        },
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'public/videos/[name].[ext]',
              outputPath: 'video',
            },
          },
        ],
      },

      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
