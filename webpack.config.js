var webpack = require('webpack')
var path = require('path')
var DashboardPlugin = require('webpack-dashboard/plugin')

var config = {
  context: path.join(__dirname, './src'),
  entry: {
    jsx: './index.jsx',
    html: './index.html',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux'
    ]
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(css|styl)$/,
        include: /src/,
        loaders: [
          'style-loader',
          'css-loader?&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'stylus-loader'
        ]
      },
      {
        test: /\.(css|styl)$/,
        exclude: /src/,
        loader: 'style!css!stylus-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loaders: [
          'file?name=[path][name].[ext]'
        ]
      },
      { test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      { test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  devServer: {
    contentBase: './src',
    hot: true
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: false
  }))
} else {
  config.plugins.push(new DashboardPlugin())
}

module.exports = config
