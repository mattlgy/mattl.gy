var connect = require('connect')
  , serveStatic = require('serve-static');
  
connect().use(serveStatic(__dirname + '/www')).listen(8080);
