const jsonServer = require('json-server');

module.exports = {
  start: function () {
    const server = jsonServer.create();
    const router = jsonServer.router('db.json');
    const middlewares = jsonServer.defaults();
    const port = Number(3004);
    server.use(middlewares);
    server.use(router);
    server.listen(port, function () {
      console.log('JSON Server is running')
    });

    return server;
  }
}
