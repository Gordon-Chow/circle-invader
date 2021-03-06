const path = require('path');
module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(  __dirname,'./client/dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js||jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }

}