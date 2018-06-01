'use strict'
var log = require('../logger');
/**
  Method which defined ProcessHistoryDao variable by loading model
**/
var ProcessHistoryDao = module.exports = function(model) {
  this.processHistoryModel = model;
}

/**
  Method which handles success or failure by calling process history insertion/save
**/
ProcessHistoryDao.prototype.insertProcessHistory= function(req,callback) {
    saveProcessHistory.call(this,req,function(data){

        if(data.status === "SUCCESS"){
            log.info('reading data inside success ::',data.status,'processHistoryDao')
            this.handleSuccess(data, callback)
        }
        else{
            this.handleError(data, callback)
        }
    }.bind(this));
}

/**
  Method to insert/save process history details into process_history table
**/
var saveProcessHistory = function(req,callback) {
  try{
    var errors = [];
    var model = this.processHistoryModel;
    log.info('printing model :::','','processHistoryDao')
    log.info('printing product instance id from json :::',req.body.productInstanceId,'processHistoryDao');
    var processHistoryInsert = model.build({
           product_instance_id: req.body.productInstanceId,
           product_descr: req.body.productDescr,
           task_id: req.body.taskId,
           task_description: req.body.taskDescription,
           transaction_type: req.body.transactionType,
           completed_by: req.body.completedBy,
           completed_time: new Date(),
           order_received_start_time: new Date(),
           manual_assign_complete_time: new Date(),
           disposition : req.body.disposition,
           outcome : req.body.outcome,
           attendees : req.body.attendees,
           reason : req.body.reason,
           task_type : req.body.taskType,
           sla_time : new Date(),
           added_by : req.body.addedBy,
           added_date : new Date(),
           updated_by : req.body.updatedBy,
           updated_date : new Date()
       });
       processHistoryInsert.save().then(function(){
           log.info('ProcessHistoryInsert saved','','processHistoryDao');
           callback({"status" : "SUCCESS" , "data" : "ProcessHistory Insertion Successfull"
           });
       }).catch(function(error){
           errors.push(error.message);
           log.error('Handling Error in process history Insertion for itemId: '+req.body.productInstanceId,error,'processHistoryDao');
           callback(errors);
       });
  }catch(ex){
    errors.push(ex.message);
    log.error('Handling Eror in process history Insertion for itemId: '+req.body.productInstanceId,ex.message,'processHistoryDao');
    callback(errors);
  }
}

ProcessHistoryDao.prototype.handleError = function(msg, callback) {
  callback({
    isSuccessful:  false,
    error: msg
  })
}

ProcessHistoryDao.prototype.handleSuccess = function(data, callback) {
  callback({
    isSuccessful:  true,
    //data:   data
  })
}
