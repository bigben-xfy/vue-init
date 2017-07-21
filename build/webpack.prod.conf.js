let path = require('path')
let config = require('../config')
let utils = require('./utils')
let webpack = require('webpack')
let merge = require('webpack-merge')
// let autoprefixer = require('autoprefixer');
let baseWebpackConfig = require('./webpack.base.conf')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')

let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
	        'ENV': env,
	        'process.env.NODE_ENV': env
        }),
	    new webpack.optimize.ModuleConcatenationPlugin(),
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),*/
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
        }),
	    new UglifyJsPlugin({
		    //sourceMap: true,
		    // 最紧凑的输出
		    beautify: false,
		    // 删除所有的注释
		    comments: false,
		    compress: {
			    // 在UglifyJs删除没有用到的代码时不输出警告
			    warnings: false,
			    // 删除所有的 `console` 语句
			    // 还可以兼容ie浏览器
			    drop_console: true,
			    // 内嵌定义了但是只用到一次的变量
			    collapse_vars: true,
			    // 提取出出现多次但是没有定义成变量去引用的静态值
			    reduce_vars: true,
		    }
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