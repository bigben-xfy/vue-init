let config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
let path = require('path')
let express = require('express')
let webpack = require('webpack')
let opn = require('opn')
let proxyMiddleware = require('http-proxy-middleware')
let webpackConfig = require('./webpack.dev.conf')
let history = require('connect-history-api-fallback')

let port = process.env.PORT || config.dev.port

let server = express()
let compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

let hotMiddleware = require('webpack-hot-middleware')(compiler)
compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

let context = config.dev.context
let proxypath = config.dev.proxypath

let options = {
    target: proxypath,
    changeOrigin: true,
}
if (context.length) {
    server.use(proxyMiddleware(context, options))
}

server.use(history({
	rewrites: [
		{ from: /^\/abc$/, to: '/' }
	],
	index: '/index.html'
}))

server.use(devMiddleware)

server.use(hotMiddleware)

let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
server.use(staticPath, express.static('./static'))

module.exports = server.listen(port, err => {
    if (err) {
        console.log(err)
        return
    }
    let uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')
	
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})