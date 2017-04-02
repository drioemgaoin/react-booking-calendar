const path = require('path')
const express = require('express')
const fs = require('fs')

module.exports = {
  app: function () {
    const app = express()
    const publicPath = express.static(path.join(__dirname, '../public'))
    const indexPath = path.join(__dirname, '../public/index.html')

    app.use('/services', function(req, res){
      const file = path.join(__dirname, '../db.json');
      var readable = fs.createReadStream(file);
      readable.pipe(res);
    });
    app.use('/public', publicPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
