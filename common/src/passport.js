'use strict'
var passport = require('passport')
var passportHttp = require('passport-http')
var basicStrategy = passportHttp.BasicStrategy
var passinitialize = passport.initialize()
var passauth = passport.authenticate('basic', {session: false})
var PassportAuthenticationDao = require("../src/dao/passportAuthenticationDao");
var db = require("../src/models");
var enableAuthentication = true;

passport.use(new passportHttp.BasicStrategy(function (username, password, done) {    
  PassportAuthenticationDao.getAuthenticationDetails(username, db['authentication_details_mem'])
    .then(data => {
      var jsonObj = JSON.parse(JSON.stringify(data[0]))
      var dbpassword = Buffer.from(jsonObj.password, 'base64')
      if (password == dbpassword) {
        done(null, username)
      } else {
        return done(null, false)
      }}).catch(error => {
    return done(null, false)
  })
}))

// this function hits first when there is an API call.
function ensureAuthenticated (req, res, next) {
  var tempUser = Buffer.from(req.headers.authorization.split(' ')[1],'base64').toString('ascii').split(':');
  var user = tempUser[0];
  if(user.toUpperCase() !== "ADMIN"){
    if (req.isAuthenticated()) 
      next()
    else 
      res.sendStatus(401)
  }else
    res.sendStatus(401)
}

function limitedAuth (req,res, next){
  var tempUser = Buffer.from(req.headers.authorization.split(' ')[1],'base64').toString('ascii').split(':');
  var user = tempUser[0];
  var pwd = (new Buffer(tempUser[1])).toString('base64');
  if(user.toUpperCase() !== "ADMIN")
    res.sendStatus(401);
  else{
    PassportAuthenticationDao.limitedAuthentication(user,pwd,db['authentication_details_mem'])
    .then(data => {
       next();
     }).catch(error => {
       console.log(error);
    res.sendStatus(401)
  })
  }
}
module.exports.passinitialize = passinitialize
module.exports.passauth = passauth
module.exports.ensureAuthenticated = ensureAuthenticated
module.exports.enableAuthentication = enableAuthentication
module.exports.limitedAuth = limitedAuth

