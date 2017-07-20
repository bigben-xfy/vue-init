let path = require('path')
let config = require('../config')
let utils = require('./utils')
let webpack = require('webpack')
let merge = require('webpack-merge')
let autoprefixer = require('autoprefixer');
let baseWebpackConfig = require('./webpack.base.conf')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
//let env = config.prod.env
let env = JSON.stringify(process.env.NODE_ENV)

let webpackConfig = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: config.prod.productionSourceMap,
            extract: true
        })
    },
    output: {
        path: config.prod.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].min.js')
    },
    /*vue: {
        loaders: utils.cssLoaders({
            sourceMap: config.prod.productionSourceMap,
            extract: true
        })
    },*/
    plugins: [
        new webpack.DefinePlugin({
            //'process.env': env,
	        ENV: env
        }),
	    new webpack.optimize.ModuleConcatenationPlugin(),
	    new webpack.LoaderOptionsPlugin({
		    test: /\.vue$/,
		    options: {
			    loaders: utils.cssLoaders({
				    sourceMap: config.prod.productionSourceMap,
				    extract: true
			    }),
			    postcss: [
				    autoprefixer({
					    browsers: ['last 10 versions']
				    })
			    ]
		    }
	    }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
        new HtmlWebpackPlugin({
            filename: config.prod.index,
            template: 'index.html',
            inject: true,
            chunksSortMode: 'dependency'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })
    ]
})

if (config.prod.productionGzip) {
    let CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.prod.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports = webpackConfig