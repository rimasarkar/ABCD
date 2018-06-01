'use strict';

var env        = process.env.NODE_ENV || 'development'
,   express    = require('express')
,   path       = require('path')
,   config     = require('config')
,   bodyParser = require('body-parser')
,   api        = require('./routes/api')
,   logger     = require('./logger');

var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(express.static(path.join(__dirname, 'dist')));
    app.use(logger.expresslogger);
    app.use('/api', api);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: 'error' });
  //res.render('error');
});

module.exports = app;
