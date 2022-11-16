const path = require('path');
const yaml = require('yamljs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // 모듈 로더는 연결될 수 있다. 체인은 역순으로 실행된다?!
        use: ['style-loader', 'css-loader'],
      },
      // built-in Asset Modules
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // import 당하는 파일을 지정하는 것 참조
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
    ],
  },
};
