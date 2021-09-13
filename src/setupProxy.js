const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

const proxyTarget = process.env.PROD_URL || 'http://localhost:8000';


module.exports = function(app) {
    app.use('/api', createProxyMiddleware({
        target: proxyTarget,
        changeOrigin: true
    }));
}