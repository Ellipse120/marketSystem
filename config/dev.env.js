const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://192.168.125.63:12345/api"',
  WS_API: '"ws://192.168.125.63:12345"'
})
