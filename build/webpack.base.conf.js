require('babel-polyfill');
let webpack = require('webpack')
let path = require('path')
let config = require('../config')
let utils = require('./utils')
let autoprefixer = require('autoprefixer');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
let projectRoot = path.resolve(__dirname, '../')

let env = process.env.NODE_ENV

let useCssSourceMap
let publicPath
let assetsRoot

switch(env) {
	case 'development':
		publicPath = config.dev.assetsPublicPath
		useCssSourceMap = config.dev.cssSourceMap
		assetsRoot = config.prod.assetsRoot
		break
	default:
		publicPath = config.prod.assetsPublicPath
		useCssSourceMap = config.prod.cssSourceMap
		assetsRoot = config.prod.assetsRoot
}

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    output: {
        path: assetsRoot,
        publicPath: publicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css', '.scss'],
        //fallback: [path.join(__dirname, '../node_modules')],
	    modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
	    //modules: [path.resolve(__dirname, "src"), "node_modules"]
        //fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
    	rules: [{
		    test: /\.vue$/,
		    loader: 'vue-loader'
	    }, {
		    test: /\.js$/,
		    loader: 'babel-loader',
		    include: projectRoot,
		    exclude: /node_modules/
	    }, {
		    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		    loader: 'url-loader',
		    query: {
			    limit: 10000,
			    name: utils.assetsPath('img/[name].[hash:7].[ext]')
		    }
	    }, {
		    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		    loader: 'url-loader',
		    query: {
			    limit: 10000,
			    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
		    }
	    }]
    },
	devtool: "source-map",
	plugins: [
		new UglifyJsPlugin({
			sourceMap: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new LodashModuleReplacementPlugin({
			'collections': true,
			'paths': true
		}),
		new webpack.LoaderOptionsPlugin({
			test: /\.vue$/,
			options: {
				loaders: utils.cssLoaders({
					sourceMap: useCssSourceMap
				}),
				postcss: [
					autoprefixer({
						browsers: ['last 10 versions']
					})
				]
			}
		})
	]
}