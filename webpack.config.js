const path = require('path');

module.exports = {

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: '/\.js$/',
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader'
      }
    ]
  }
};
