const merge = require('webpack-merge');
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

// 公用配置
const commonPartConfig = {
  devtool: isEnvDevelopment ? 'source-map' : false,
  mode: isEnvProduction ? 'production' : 'development',
  output: { path: path.join(__dirname, 'dist') },
  node: { __dirname: false, __filename: false },
  resolve: {
    alias: {},
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: ['ts-loader'],
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};

const mainPartConfig = {
  entry: './src/main/index.ts',
  target: 'electron-main',
  output: { filename: 'main.bundle.js' },
  externals: [nodeExternals()],
  plugins: [
    new CopyPkgJsonPlugin({
      remove: ['scripts', 'devDependencies', 'build'],
      replace: {
        main: './main.bundle.js',
        scripts: { start: 'electron ./main.bundle.js' },
        postinstall: 'electron-builder install-app-deps',
      },
    }),
  ],
};

const rendererPartConfig = {
  entry: './src/renderer/index.tsx',
  target: 'electron-renderer',
  output: { filename: 'renderer.bundle.js' },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './temp/index.html'),
    }),
  ],
};

module.exports = [
  merge(mainPartConfig, commonPartConfig),
  merge(rendererPartConfig, commonPartConfig),
];
