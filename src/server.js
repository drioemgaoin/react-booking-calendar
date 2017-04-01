const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const publicPath = express.static(path.join(__dirname, '../public'))
    const indexPath = path.join(__dirname, '../public/index.html')

    app.use('/public', publicPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
