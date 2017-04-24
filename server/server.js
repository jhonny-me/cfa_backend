'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.use(function (req, res, next) {
  console.log(req)
  if (req.method == 'POST' && req.url.includes('managers')) {
    return next()
  }
  var namespace = req.headers.namespace;
  if (!namespace || namespace === "" ) {
    return next('You should put namespace in the header.')
  }
  var Namespace = app.models.Namespace;
  Namespace.findOne({
    title: namespace
  }, function (err, result) {
    if (err) return next(err)
    if (!result) return next("No such namesapce");
    req.namespace = result.id
    next()
  })
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
