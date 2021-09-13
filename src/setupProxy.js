const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

let proxyTarget = 'http://localhost:8000';

/* if (process.env.NODE_ENV !== 'production') {
    console.log('dev mode');
    proxyTarget = 'http://localhost:8000';
} else {
    proxyTarget = process.env.PROD_URL;
} */

module.exports = function(app) {
    app.use('/api/*', createProxyMiddleware({
        target: proxyTarget,
        changeOrigin: true
    }));
}