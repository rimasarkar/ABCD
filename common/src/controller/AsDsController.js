'use strict'
var AsDsDao = require("../dao/AsDsDao");
var log = require('../logger');
module.exports.Controller = function(app,db,passport){

var asdsDao = new AsDsDao(db);

    app.post('/common/post/AccountMerge', passport.ensureAuthenticated, function(req, res){
        asdsDao.accountMerge(req,function(result){
        res.json(result);
        })});
  };
