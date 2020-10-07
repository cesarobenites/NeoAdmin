const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const fs = require('fs');

// Dynamic entry point with .pug files
function getEntries (){
    return fs.readdirSync('./src/pug')
        .filter(
			(file) => file.match(/.*\.pug$/)
        )
        .map((file) => {
			return {
			    name: file.substring(0, file.length - 4),
			    path: './src/pug/' + file
			};
        }).reduce((memo, file) => {
			memo[file.name] = file.path;
			return memo;
        }, {});
}

const entryPoint = getEntries();

// HtmlWebpackPlugin dinámica, no incluye "app"
var entryHtmlPlugins = Object.keys(entryPoint).map(function(entryName) {    
    return new HtmlWebpackPlugin({
        filename: entryName + '.html',
        template: 'src/pug/' + entryName + '.pug',
		minify: false,
		inject: false
    });
});

module.exports = {
    entry: {
		neoadmin: './src/neoadmin.js'
	},
    output: {
		path: path.resolve(__dirname, '../dist'),
        filename: "assets/[name].[hash:20].js"
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendors: false,
				vendor: {
					test: /[\\/]node_modules[\\/](.(?!.*\.css$))*$/,
					chunks: "initial",
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			},
		},
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	module: {
		rules: [
			{
				test: require.resolve('jquery'),
				loader: 'expose-loader',
				options: {
					exposes: ['$', 'jQuery'],
				},
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: "pug-loader",
						options: {
							pretty: true
						}
			        }
				]
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader, 
					{
						loader: "css-loader",
						options: {
							sourceMap: false
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[ 'postcss-preset-env' ]
								]
							}
						} 
					},
					{
						loader: 'resolve-url-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
			    test: /\.(jpg|png|gif)$/,
			    use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash:20].[ext]',
							outputPath: 'assets/images/',
							publicPath: 'images/',
							esModule: false,
						}
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash:20].[ext]',
							outputPath: 'assets/fonts/',
							publicPath: 'fonts/',
							esModule: false,
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default']
		}),
		// new CopyPlugin({
		// 	patterns: [
		// 		{ from: './src/plugins', to: '../dist/plugins', noErrorOnMissing: true, },
		// 	],
		// }),
		new MiniCssExtractPlugin({
			filename: "assets/[name].[hash:20].css",
			chunkFilename: "[id].css"
		}),
		new MomentLocalesPlugin({
			localesToKeep: ['es', 'en'],
		}),
	].concat(entryHtmlPlugins),
	resolve: {
		alias: {
			pace: 'pace-js'
		}
	}
};