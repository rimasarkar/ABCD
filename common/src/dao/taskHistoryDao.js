'use strict'
var log = require('../logger');
var errMsg = "Internal Server Error. Please Contact System Administrator."
var taskHistoryModel;
var taskDetailModel;
var reqObj;
var TaskHistoryDao = module.exports = function (db) {
    taskHistoryModel = db['task_history'];
    taskDetailModel = db['task_history_details'];
    this.db = db;
}

TaskHistoryDao.prototype.handleError = function (msg, callback) {
    callback({ isSuccessful: false, error: msg })
}

TaskHistoryDao.prototype.handleSuccess = function (data, callback) {
    callback({ isSuccessful: true })
}

TaskHistoryDao.prototype.insertTaskHistory = function (req, callback) {
    reqObj = req;
    Promise.all([req.body.taskHistory.reduce(processEachTaskHistoryObject, Promise.resolve())]).then(() => {
      callback({ isSuccessful: true })
    }).catch(err =>{
        callback({ isSuccessful: false, error: errMsg })
    })


};

var processEachTaskHistoryObject = function(prev,curr){

  var taskhistorymodel = taskHistoryModel;
  var taskdetailmodel =  taskDetailModel;

  return prev.then(function() {

      return maxTaskHistorySequence(reqObj,curr)
        .then((maxSeq)=>{
          log.info('MAX TASK PROMISE RETURNED..' + maxSeq,'processEachTaskHistoryObject','TaskHistoryDAO')
          var maxTaskSeq = 1;
                    if (isNaN(parseFloat(maxSeq)))
                      maxTaskSeq = '1';
                    else
                      maxTaskSeq = maxSeq+1;
          return saveTaskHistory(reqObj,maxTaskSeq,curr,taskhistorymodel)})
        .then((data)=>{
            log.info('SAVE TASK PROMISE RETURNED..','processEachTaskHistoryObject','TaskHistoryDAO')
           return getMaxSequenceHistoryDetail(reqObj,curr,taskdetailmodel)})
        .then((seq) => {
          log.info('MAX TASK HISTORY PROMISE RETURNED..' + seq,'processEachTaskHistoryObject','TaskHistoryDAO')
          var maxDetailSeq = 1;
                    if (isNaN(parseFloat(seq)))
                      maxDetailSeq = '1';
                    else
                      maxDetailSeq = seq +1;
          return saveTaskDetail(reqObj,maxDetailSeq,curr,taskdetailmodel)})
          .then(() => {
            log.info('ITEM PROCESSED SUCCESSFULLY..','processEachTaskHistoryObject','TaskHistoryDAO')
              return  Promise.resolve('ITEM PROCESSED SUCCESSFULLY..')
          }).catch((err) =>{
              log.error(err,'error caught for instanceId: '+reqObj.body.taskHistoryHeader.productInstanceId,'TaskHistoryDAO-processEachTaskHistoryObject')
               errMsg='InstanceId: ' +reqObj.body.taskHistoryHeader.productInstanceId +' - '+err
              return Promise.reject('','processEachTaskHistoryObject','TaskHistoryDAO')
          })
          ;
  })
};



var maxTaskHistorySequence = function (req, taskobj) {
    var localTaskobj = taskobj;
    var taskhistorymodel = taskHistoryModel;
    return taskHistoryModel.max('sequence', { where: { product_instance_id: req.body.taskHistoryHeader.productInstanceId, Parent_process_id: req.body.taskHistoryHeader.parentProcessId, milestone_id: req.body.taskHistoryHeader.mileStoneId, task_id: localTaskobj.taskId } })
   };


var saveTaskHistory = function (req, seq, taskHistory, model) {
  return model.create({
            product_instance_id: req.body.taskHistoryHeader.productInstanceId,
            Parent_process_id: req.body.taskHistoryHeader.parentProcessId,
            milestone_id: req.body.taskHistoryHeader.mileStoneId,
            task_id: taskHistory.taskId,
            sequence: seq,
            task_description: taskHistory.taskDescription,
            status: taskHistory.status,
            user: taskHistory.user,
            datetimestamp: taskHistory.dateTimeStamp
        });
};

var getMaxSequenceHistoryDetail = function (req, taskobj, taskdetailmodel) {
  return taskdetailmodel.max('sequence', { where: { task_id: taskobj.taskId } });
};

var saveTaskDetail = function (req, seq, taskHistory, model, callback) {
    try {
        var promiseObj = [];
        if(taskHistory.taskHistoryDetails)
        {
        for (var j = 0; j < taskHistory.taskHistoryDetails.length; j++ , seq++) {
            var promise = model.build({
                task_id: taskHistory.taskId,
                sequence: seq,
                result_name: taskHistory.taskHistoryDetails[j].resultName,
                result_value: taskHistory.taskHistoryDetails[j].resultValue
            }).save();
            promiseObj.push(promise);
        }
        return Promise.all(promiseObj);
      }
        else
          return Promise.resolve();
    }
    catch (ex) {
        log.error('Error caught in task history Insertion', ex.message, 'taskHistoryDao');
        return Promise.reject(ex);
    }
}
TaskHistoryDao.prototype.getTaskHistory = function (req, callback) {
    var taskHistoryHeader = {};
    var taskHistory = [];
    var taskHistoryDetails = [];
    var jsonobj={};
    return Promise.all([getTaskHistory1.call(this, req)]).then(data =>{
    if (JSON.parse(JSON.stringify(data))[0] && JSON.parse(JSON.stringify(data))[0].length !== 0) {
        var i =1 ;
        Promise.all(JSON.parse(JSON.stringify(data))[0].map(function(row){
            //taskHistoryHeader.enterpriseItemid = JSON.parse(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.stringify(row)))))).enterpriseItemid
            taskHistoryHeader.productInstanceId = JSON.parse(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.stringify(row)))))).productInstanceId
            taskHistoryHeader.parentProcessId = JSON.parse(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.stringify(row)))))).parentProcessId
            taskHistoryHeader.mileStoneId = JSON.parse(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.stringify(row)))))).mileStoneId
            var taskid = JSON.stringify(JSON.parse(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.stringify(row)))))).taskId)
        //delete row.enterpriseItemid;
        delete row.productInstanceId;
        delete row.parentProcessId;
        delete row.mileStoneId;
        return Promise.all([getTaskHistoryDetails1.call(this, taskid)]).then(details =>{
        jsonobj = JSON.parse(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.stringify(row))))));
        jsonobj.taskHistoryDetails = JSON.parse(JSON.stringify(details))[0]
             taskHistoryDetails.push(jsonobj)
        }).catch(function(err){
            log.info('Error','',err)
            callback({"isSuccessful" : false, "error":errMsg});
        })
 }.bind(this))).then(result=>{
     var res ={};
         res.taskHistoryHeader = taskHistoryHeader
         res.taskHistory=taskHistoryDetails;
 callback(res);
       }).catch(function(err){
         log.error("Error caught while retrieving task history details..",err,"taskhistorydao");
         callback({"isSuccessful" : false, "error":"Internal Server Error. Please contact System Administrator."});
       })
    }
    else{
        callback({"isSuccessful" : false, "error":["Task History Details not found for product_instance_id " +req.params.id]});
    }
    }).catch(function (err){
        log.error('Error caught..','Error : '+err,'')
        callback({"isSuccessful" : false, "error":["Task History Details not found for product_instance_id " +req.params.id]});
    })

}

var getTaskHistory1 = function (req) {
   return new Promise((resolve, reject) => {
        var paramsInstanceId = req.params.id;
        taskHistoryModel.findAll({
            where: { product_instance_id: paramsInstanceId },
            attributes: [
                ['product_instance_id', 'productInstanceId'],
                ['Parent_process_id', 'parentProcessId'],
                ['milestone_id', 'mileStoneId'],
                ['task_id', 'taskId'],
                ['task_description', 'taskDescription'],
                ['status', 'status'],
                ['user', 'user'],
                ['datetimestamp', 'dateTimeStamp']
            ]
        }).then(function (data) {
            return resolve(data)
        }).catch(function (err) {
           return reject(err)
        })
    });
};

var getTaskHistoryDetails1 = function (taskId) {

    var taskId = taskId;
   return new Promise((resolve, reject) => {
        taskDetailModel.findAll({
            where: { task_id: taskId },
            attributes: [
                ['result_name', 'resultName'],
                ['result_value', 'resultValue']
            ]
        }).then(function (data) {
            return resolve(data)
        }).catch(function (err) {
            return resolve(err)
        })
    });
};
