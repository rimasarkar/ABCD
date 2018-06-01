'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
var express = require('express');
var https = require('https');
var path = require("path");
var fs = require("fs");
var db = require('./models/index');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var app = express();
if(process.env.NODE_ENV !== 'SQLITE_TEST'){
  var passport = require('./passport')
  var config = require('./config/' + process.env.NODE_ENV)
  var certFile = path.resolve(__dirname, './config/ssl/' + process.env.NODE_ENV + '/cert.pem')
  var keyFile = path.resolve(__dirname, './config/ssl/' + process.env.NODE_ENV + '/key.pem')
  var certFiles = fs.readFileSync(certFile)
  var keyFile = fs.readFileSync(keyFile)
}
else{
  var passport = {enableAuthentication : false}
  var config = {port:3000};
}
var logger = require('./logger')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger.expresslogger)



if(!passport.enableAuthentication) // added to skip authentication locally..
{
  passport.ensureAuthenticated = (req,res,next) => {
    console.log("mock authenticated...only for test cases..");
    return next();
  }
}
else
{
  console.log("Authentication enabled..");
  app.use(passport.passinitialize)
  app.use('/', passport.passauth)
}

//loading all controllers
fs.readdirSync(__dirname +'/controller')
  .filter(function(file) {
    if(process.env.NODE_ENV === "SQLITE_TEST"){
        if(file === "productInstanceController.js")
          return true;
        else
          return false;
    }
    else
      return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var route = require('./controller/'+ file)
        route.Controller(app,db,passport);
  });

//create https server
var options = {
  cert: certFiles,
   key: keyFile
};

var server = https.createServer(options, app);

server.listen(config.port || 3000, function(){
  console.log('Common Service Application is running on port ::' + config.port)
});

module.exports = app;
