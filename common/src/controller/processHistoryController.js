'use strict'
var ProcessHistoryDao = require("../dao/processHistoryDao");

module.exports.Controller = function(app,db,passport){

  var processHistoryDao = new ProcessHistoryDao(db['process_history']);

  app.post('/common/post/processhistory', passport.ensureAuthenticated, function(req, res){
    processHistoryDao.insertProcessHistory(req,function(result){
    res.json(result);
    });
  });
}
