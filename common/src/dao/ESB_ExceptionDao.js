'use strict'

var util = require('../utils/util');
var log = require('../logger');
var errMsg = "Internal Server Error. Please Contact System Administrator."
var ESBExceptionDao = module.exports = function(db) {
  this.db = db;
}

ESBExceptionDao.prototype.insertESBException = function(req,target,callback){
  try{
     var errors = [];
     var promiseObj;
     var id = target.toUpperCase() === "APPIAN" ? req.body.productInstanceId : req.body.enterpriseItemId
     if(target.toUpperCase() === "APPIAN")
        promiseObj = insertAppianException(req, this.db);
     else if(target.toUpperCase() === "SFDC")
        promiseObj = insertBillingException(req, this.db);

     Promise.all([promiseObj])
                        .then(function (result) {
                        log.info("Insertion Successful",result,'ESBExceptionDao');
                          util.handleSuccess("success",callback);
                        })
                        .catch(function (err) {
                          log.error("Handling Error in ESBException Insertion for itemId: "+id, err.message,'ESBExceptionDao');
                          util.handleError(500,[errMsg],callback);
                        })
   }
   catch(ex){
     errors.push(ex.message);
     log.error('Handling Error in ESBException Insertion for itemId: '+id,ex.message,'ESBExceptionDao');
     util.handleError(400,errors,callback);
   }

}


ESBExceptionDao.prototype.getItemFromProductToProcessErrors = function(itemId){

  return new Promise((resolve, reject) => {
    try {
      var model = this.db["product_to_process_errors"];
      model.findAll({
        where: {
          product_instance_id: itemId
        },
        raw: true
      }).then(function (data) {
        return resolve(data)
      }).catch(function (error) {
        log.error('getItemFromProcessToProcessErrors failed for itemId: ' + itemId,error,'EID')
        return reject(error)
      })
    } catch (ex) {
      log.error('Exception occurred while retrieving the content in getItemFromProcessToProcessErrors for item Id : ' + itemId,ex,'EID')
      return reject(ex)
    }
  })
}

ESBExceptionDao.prototype.getItemFromSFDCErrors = function(itemId){
  return new Promise((resolve, reject) => {
    try {
      var model = this.db["billing_sfdc_errors"];
      model.findAll({
        where: {
          enterprise_item_id: itemId
        },
        raw: true
      }).then(function (data) {
        return resolve(data)
      }).catch(function (error) {
        log.error('getItemFromSFDCErrors failed for itemId: ' + itemId, error, 'EID')
        return reject(error)
      })
    } catch (ex) {
      log.error('Exception occurred while retrieving the content in getItemFromSFDCErrors for item Id : ' + itemId, ex, 'EID')
      return reject(ex)
    }
  })

}

/*Private functions...*/

var insertAppianException = function(req, db){
  var model = db["product_to_process_errors"];
             return db.sequelize.transaction(function (t) {
                 return model.create({
                   product_instance_id : req.body.productInstanceId,
                   url : req.body.url,
                   json_obj : req.body.jsonObj,
                   status : 'PND',
                   updated_by :'ESB',
                   error_description : req.body.errorDescription,
                   updated_date : new Date(),
                   added_by : 'ESB',
                   added_date : new Date()}, { transaction: t })
                 })

}


var insertBillingException = function(req,db){
  var model = db["billing_sfdc_errors"];
             return db.sequelize.transaction(function (t) {
                 return model.create({
                   enterprise_item_id : req.body.enterpriseItemId,
                   url : req.body.url,
                   json_obj : req.body.jsonObj,
                   status : 'PND',
                   updated_by :'ESB',
                   error_description : req.body.errorDescription,
                   updated_date : new Date(),
                   added_by : 'ESB',
                   added_date : new Date()}, { transaction: t })
                 })

}
