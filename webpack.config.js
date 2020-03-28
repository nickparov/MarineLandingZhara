const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');




module.exports = {
  entry: path.join(__dirname, '/ts/app.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', MiniCssExtractPlugin.loader],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './build',
    hot: true
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  watch:true,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
        template: "./index.html",
        inject: true
    }),
    new MiniCssExtractPlugin()
  ]
};