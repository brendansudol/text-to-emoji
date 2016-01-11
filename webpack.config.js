var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: './js/app.js',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  },

  module: {
    loaders: [
      { 
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015','react'] }
      },
      { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract('css!sass') 
      },
      { 
        test: /\.json$/, 
        loader: 'json-loader' 
      },
    ]
  },

  sassLoader: {
    outputStyle: (process.env.NODE_ENV == 'prod' ? 
                 'compressed' : 'expanded')
  },

  plugins: [
    new ExtractTextPlugin("app.css")
  ]
}
