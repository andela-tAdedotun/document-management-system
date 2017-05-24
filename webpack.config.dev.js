import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  // debug: true,
  devtool: 'cheap-module-eval-source-map',
  // noInfo: false,
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './client/index'
  ],
  target: 'web',
  output: {
    path: `${__dirname}/client/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ // define where to save the file
      filename: '[name].css',
      allChunks: true,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'shared')
        ],
        loaders: ['babel-loader']
      },
      {
        test: /(\.css)$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin
        .extract(['css-loader', 'sass-loader'])
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=4000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
