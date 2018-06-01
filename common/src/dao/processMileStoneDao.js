'use strict'
var log = require('../logger');
var errMsg = "Internal Server Error. Please Contact System Administrator."
var ProcessMileStoneDao = module.exports = function (processmodel, setupmodel) {
    this.processMileStoneModel = processmodel;
    this.milestonesetupModel = setupmodel;
}

ProcessMileStoneDao.prototype.handleError = function (msg, callback) {
    callback({
        isSuccessful: false,
        error: msg
    })
}

ProcessMileStoneDao.prototype.handleSuccess = function (data, callback) {
    callback({
        isSuccessful: true
    })
}

ProcessMileStoneDao.prototype.updateMileStones = function (req, callback) {
    getProcessMilestoneSequence.call(this, req.body.parentProcessId)
        .then(seq => {
            saveProcessMilestone.call(this, req, seq, function (data) {
                if (data.status === "SUCCESS")
                    this.handleSuccess(data, callback)
                else
                    this.handleError(data, callback)
            }.bind(this));
        }).catch(function (error) {
            log.error('Error caught in process milestone for parentProcessId: '+req.body.parentProcessId, error, 'processMileStoneDao');
            this.handleError("Error while updating the sequence ^^^^ ", callback)
        })

}

var saveProcessMilestone = function (req, seq, callback) {
    try {

        var errors = [];
        var model = this.processMileStoneModel;
        var promiseObj = [];

        var promise = model.update({
            status: req.body.Status,
        }, {
                where: {
                    parent_process_id: req.body.parentProcessId,
                    child_process_id: req.body.childProcessId,
                    milestone_id: req.body.mileStoneId,
                }
            })
        promiseObj.push(promise);

        Promise.all(promiseObj).then(function () {
            log.info('process milestone update successful', '', 'processMileStoneDao');
            callback({
                "status": "SUCCESS", "data": "process Milestone Update Successfull"
            });
        }).catch(function (error) {
            errors.push(error.message);
            log.error('Error in update process milestone for parentProcessId: '+req.body.parentProcessId, error, ' processMileStoneDao');
            callback(errMsg);
        })
    }
    catch (ex) {
        errors.push(ex.message);
        log.error('Error in update process milestone for parentProcessId: '+req.body.parentProcessId, ex.message, 'processMileStoneDao');
        callback(errMsg);
    }
};

var getProcessMilestoneSequence = function (parentProcessId) {
    var model = this.processMileStoneModel;
    return new Promise((resolve, reject) => {
        model.max('sequence', { where: { parent_process_id: parentProcessId } }).then(seq => {
            console.log("maximum sequence number :" + seq)
            if (isNaN(parseFloat(seq)))
                return resolve('1')
            else
                return resolve(++seq)
        }).catch(function (error) {
            log.error(' Error in update process milestone for parentProcessId: '+parentProcessId, error, 'processMileStoneDao');
            return reject('1')
        })
    });
}

ProcessMileStoneDao.prototype.getRetrieveProcessMilestones = function (req, model, callback) {
    var jsonResObj = {};
    getenterpriseId.call(this, model, req)
        .then(data => {
            //log.info('parent process id for the given enterprise id :', req.params.id, ' is ', JSON.parse(JSON.stringify(data[0])).processId)
            if (data.length != 0) {
                var processId = JSON.parse(JSON.stringify(data[0])).processId
                var recentTransactionType = JSON.parse(JSON.stringify(data[0])).recentTransactionType
                return Promise.all([getProcessMilestones.call(this, processId)]).then(data => {
                    if (JSON.parse(JSON.stringify(data[0])).STATUS)
                    {
                        jsonResObj = {"transactionType" : recentTransactionType, "milestones" : JSON.parse(JSON.stringify(data[0])).data }
                        //callback({ mileStones: JSON.parse(JSON.stringify(data[0])).data })
                        callback(jsonResObj);
                    }
                    else
                        callback({ "isSuccessful": false, "error": ["No milestones found for the given Enterprise Id"] })
                }).catch(function (err) {
                    log.error('err', 'err', err)
                callback({ "isSucessful": false, "error": Array.isArray(err) ? err : [err] })
                })
            }
            else
                callback({ "isSuccessful": false, "error": ["No Data found for the given Enterprise Id"] })
        }).catch(function (err) {
            callback({ "isSuccessful": false, "error": Array.isArray(err) ? err : [err] })
        })
}



var getProcessMilestones = function (parentProcessId) {
    log.info(parentProcessId, 'parentProcessId', '$$$')
    this.processMileStoneModel.belongsTo(this.milestonesetupModel, { foreignKey: 'milestone_id', targetKey: 'milestone_id' });
    return new Promise((resolve, reject) => {
        this.processMileStoneModel.findAll({
            where: { parent_process_id: parentProcessId },
            attributes: [
                ['sequence', 'sequence'],
                ['status', 'status']
            ],
            include: [{
                model: this.milestonesetupModel, raw: false, alias: 'mileStones', attributes: [
                    ['milestone_description', 'desc']
                ]
            }], order:['sequence']
        }).then(function (data) {
          var resultArr = [];
          var tempObj = {};
          if(data)
          {
            var queryResult = JSON.parse(JSON.stringify(data));
            for(var i=0 ; i<queryResult.length; i++){
              var tempData = queryResult[i];
               Object.keys(tempData).forEach(prop => {
                  if(!!prop && prop === "milestone_setup"){
                    tempObj["mileStoneDescription"] = tempData[prop].desc;
                  }
                  else{
                    tempObj[prop] = tempData[prop];
                  }
               })
               resultArr.push(tempObj);
               tempObj = {};
            }
          }
            //log.info('!!!!!!' + JSON.stringify(data))
            //log.info('####' + JSON.stringify(JSON.parse(JSON.stringify(data))))
            resolve({ "STATUS": true, data: resultArr })
        }).catch(function (err) {
            log.info('@@@@@@@ ' + err)
            reject({ "STATUS": false, data: err })
        })
    });
}

var getenterpriseId = function (model, req) {
    return new Promise((resolve, reject) => {
        try {
            model.findAll({
                where: { product_instance_id: req.params.id },
                attributes: [
                    ['parent_process_id', 'processId'],
                    ['recent_transaction_type','recentTransactionType']
                ]
            }).then(function (data) {
                if (data.length != 0)
                    return resolve(data)
                else
                    return reject('enterprise item id does not exist.')
            }).catch(function (error) {
                log.error('Process Milestone error caught for itemId: '+req.params.id ,error,'processMileStoneDao')
                return reject(error)
            })
        } catch (ex) {
            log.error('Exception occurred while retrieving the process milestones information for itemid: '+req.params.id)
            return reject(ex)
        }
    })
}
