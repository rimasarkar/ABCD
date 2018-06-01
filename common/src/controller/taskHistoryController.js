'use strict'
var TaskHistoryDao = require("../dao/taskHistoryDao");
var log = require('../logger');
module.exports.Controller = function(app,db,passport){

var taskHistoryDao = new TaskHistoryDao(db);

    app.post('/common/post/taskHistory', passport.ensureAuthenticated, function(req, res){
        taskHistoryDao.insertTaskHistory(req,function(result){
        res.json(result);
        })});

    app.get('/common/retrievetaskhistory/productinstanceid/:id',passport.ensureAuthenticated, function(req, res){
    try{
        taskHistoryDao.getTaskHistory(req, function(result){
            res.json(result);
        })}
    catch(err){
        log.error("Exception caught for instanceId: "+req.params.id,err.message,"TaskHistoryController");
        res.status(500).json({"isSuccessful":"false","error":err.message});
    }})

  };
