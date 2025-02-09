const PROXY_CONFIG = [
  {
    context: [
      '/api',
      '/storage',
      '/sanctum',
    ],
    "target": "http://127.0.0.1:8000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
]

module.exports = PROXY_CONFIG;
