const isProd = process.env.ROOT_URL === 'production'

module.exports = {
  ROOT_URL: isProd ? 'https://iohacks.io' : ''
}
