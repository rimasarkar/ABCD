'use strict'
var InstanceNotesDao = require("../dao/instanceNotesDao");
var log = require('../logger');
module.exports.Controller = function(app,db,passport){

var instanceNotesDao = new InstanceNotesDao(db['product_instance_notes']);

app.post('/common/post/instanceNotes', passport.ensureAuthenticated, function(req, res){
    instanceNotesDao.insertInstanceNotes(req,function(result){
    res.json(result);
    });
  });

app.get('/common/retrievenotes/productinstanceid/:id',passport.ensureAuthenticated, function(req, res){
 try{
    instanceNotesDao.getInstanceNotes(req, db['product_instance'], function(result){
        res.json(result);
    })
 }
 catch(err){
     log.error("Exception caught ",err.message,"InstanceNotesController");
     res.status(500).json({"isSuccessful":"false","error":err.message});
   }
 })

};
