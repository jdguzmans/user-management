const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const CopyPlugin = require(`copy-webpack-plugin`)
const path = require(`path`)
const webpack = require(`webpack`)

require(`dotenv`).config({ path: `.env` })

const prodPlugins = []

module.exports = {
  entry: `./src/index.tsx`,
  mode: `development`,

  output: {
    filename: `bundle.[fullhash].js`,
    path: path.resolve(__dirname, `dist`),
    publicPath: `/`
  },

  devServer: {
    historyApiFallback: true,
    port: 4056
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`
    }),

    // new CopyPlugin({
    //   patterns: [
    //     { from: `public`, to: `./` }
    //   ]
    // })

    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env)
    }),

    ...prodPlugins
  ],

  resolve: {
    modules: [__dirname, `src`, `node_modules`],
    extensions: [`*`, `.js`, `.jsx`, `.tsx`, `.ts`]
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: [`babel-loader`]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [`style-loader`, `css-loader`]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [`file-loader`]
      }
    ]
  },

  devtool: `source-map`
}
