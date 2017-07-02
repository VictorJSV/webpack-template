const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'faker'
];

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
    //, publicPath: 'dist/' // tambien se puede especificar path publicos por loader
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        //use: ['style-loader', 'css-loader'], //Derecha a izquierda se lee los loaders
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              limit: 40000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    // Este corrige la doble importación del vendor en el bundle 
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // Es donde estan las librerías y MANIFEST es de mejorar la llamada del browser
    }),
    // Este agrega los scripts generador por webpack automaticamente al index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // Para definir variables de entorno
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

module.exports = config;