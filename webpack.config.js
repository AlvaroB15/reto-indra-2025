// const path = require('path');
// const slsw = require('serverless-webpack');
// const nodeExternals = require('webpack-node-externals');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
//
// module.exports = {
//     context: __dirname,
//     mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
//     entry: slsw.lib.entries,
//     devtool: slsw.lib.webpack.isLocal ? 'cheap-module-eval-source-map' : 'source-map',
//     resolve: {
//         extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
//         plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
//     },
//     output: {
//         libraryTarget: 'commonjs',
//         path: path.join(__dirname, '.webpack'),
//         filename: '[name].js',
//     },
//     target: 'node',
//     externals: [nodeExternals()],
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/,
//             },
//         ],
//     },
// };
