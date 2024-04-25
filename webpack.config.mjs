import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const __dirname = path.resolve()

const entry = path.resolve(__dirname, 'src', 'index.tsx')
const module = {
    rules: [
        { test: /\.tsx$/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] } }, exclude: /(node_modules|bower_components)/ }, // React + TypeScript
        { test: /\.ts$/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] } }, exclude: /(node_modules|bower_components)/ }, // TypeScript
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // SCSS
        { test: /\.(png|jpe?g|gif|svg|webp)$/, use: [{ loader: 'file-loader' }] },// Images
        { test: /\.(mp4|webm|ogv)$/, use: [{ loader: 'file-loader' }] },// Videos
        { test: /\.(mp3|wav|ogg|flac)$/, use: [{ loader: 'file-loader' }] },// Audios
        { test: /\.(woff2?|eot|ttf|otf)$/, use: [{ loader: 'file-loader' }] },// Fonts
    ]
}
const resolve = { extensions: ['.tsx', '.ts', '.js'], preferRelative: true }
const output = { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js', }
const devServer = { static: { directory: path.resolve(__dirname, 'public') }, compress: true, port: 3000, historyApiFallback: true }
const plugins = [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html'), favicon: path.resolve(__dirname, 'public', 'favicon.ico') }),
    new CopyWebpackPlugin({ patterns: [{ from: 'public', to: '', globOptions: { ignore: ['**/index.html'] } }] })
]

export default { entry, module, resolve, output, devServer, plugins }