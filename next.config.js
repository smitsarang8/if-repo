const path = require('path')

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["dl.airtable.com"],
  },
  devServer: {
    historyApiFallback: true
  }
}