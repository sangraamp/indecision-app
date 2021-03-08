const path = require('path')

// entry -> output

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				// run all .js files through babel except the ones in node_modules
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/,
			},
		],
	},
	devtool: 'eval-cheap-module-source-map', // for easy debugging
	devServer: {
		contentBase: path.join(__dirname, 'public'), // setting up webpack-dev-server
	},
	mode: 'development',
}
