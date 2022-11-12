module.exports = {
  entry: './src/index.js',
  output: { filename: 'index.js' },
  devServer: {
    contentBase: __dirname + '/dist/',
    inline: true,
    hot: true,
    host: 'localhost',
    port: 5500,
  },
};
