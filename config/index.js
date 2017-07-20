let path = require('path')

module.exports = {
    prod: {
        env: {
            NODE_ENV: 'prod'
        },
        index: path.resolve(__dirname, '../product/index.html'),
        assetsRoot: path.resolve(__dirname, '../product'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
	/*test92: {
		env: {
			NODE_ENV: '"test92"'
		},
		index: path.resolve(__dirname, '../test/index.html'),
		assetsRoot: path.resolve(__dirname, '../test'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/test/',
		productionSourceMap: true,
		productionGzip: false,
		productionGzipExtensions: ['js', 'css']
	},*/
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8098,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        context: [ //代理路径
        
        ],
        proxypath: '',
        cssSourceMap: false
    }
}
