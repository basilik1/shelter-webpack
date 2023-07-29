const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    pets: './src/pets/pets.js'
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      assetModuleFilename: "assets/[name][ext]"
  },
  mode: 'development',
  module: {
      rules: [ 
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: false },
            }
          ]
        },
        { 
          test: /\.json$/, 
          type: 'json' 
        },
        {
          test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
            {
              loader: "sass-resources-loader",
              options: {
                resources: [
                  'src/styles/vars.scss'
                ]
              }
            }
          ],
          
        },

      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: [ 'main' ],
      }
    ),
    new HtmlWebpackPlugin({
      template: './src/pets/index.html',
      filename: './pets/index.html',
      chunks: [ 'pets' ]
      }
    ),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/images/', to: './assets/'}
      ]
    }),
  ],
  optimization: {
    minimize: true,
  },
  devServer: {
      compress: true,
      port: 3000,
  },
};

