'use strict'
var log = require('../logger');
var utils = require('../utils/util')
var errMsg = "Error Encountered!!. Please contact system administrator"
var processmilestonemodel
var workflowModel
var ProductInstanceDao = module.exports = function (db) {
  this.db = db;
  processmilestonemodel = db.process_milestones;
  workflowModel = db.workflow_history
}

ProductInstanceDao.prototype.handleError = function (msg, callback) {
  callback({
    isSuccessful: false,
    error: msg
  })
}

ProductInstanceDao.prototype.handleSuccess = function (data, callback) {
  callback({
    isSuccessful: true
  })
}

ProductInstanceDao.prototype.getAllItemsSuccess = function (data, callback) {
  callback({
    isSuccessful: true,
    data
  })
}


ProductInstanceDao.prototype.getAllItemIds = function (callback) {
  try {
    this.db.product_instance_mem.findAll({
      attributes: [
        [this.db.Sequelize.fn('DISTINCT', this.db.Sequelize.col('enterprise_item_id')), 'enterpriseItemId']
      ],
      limit: 30
    })
      .then(data => {
        log.info("Enterprise Item Id fetched..successfully..", '-', 'productInstanceDao')
        this.getAllItemsSuccess(data, callback);
      })
      .catch(err => {
        log.info("Error caught.." + err, '-', 'productInstanceDao')
        this.handleError(Array.isArray(err) ? err : [err], callback);

      })
  }
  catch (err) {
    log.error('Error caught..', err.message, 'productInstanceDao')
    this.handleError([errMsg], callback)
  }

}

/**
  Method to update the product instance status with parent process id and insert corresponding milestone..
  **params**
  req : request body recieved
  callback : json response to send back
**/
ProductInstanceDao.prototype.upsertProductMilestone = function (req, callback) {
  try {
    fetchProduct.call(this, req.body.productInstanceId, function (data) {
      var errors = [];
      if (data.status === "SUCCESS") {
        // product instance found..insert milestones in process miletones table and update parent process id in product instance table..
        if (req.body.workflowRestarted === "Y") {
          return this.db.sequelize.transaction(function (t) {
            return data.product.updateAttributes({ parent_process_id: req.body.parentProcessId }, { transaction: t })
              .then(() => {

                 return  updateWorkFlow.call(this, req).then(function(){
                    log.info("parent process id updated successfully in product instance table..", " ", "ProductInstanceDao");
                    callback({ "isSuccessful": true });
                }).catch(err =>{
                   log.error("parent process id updation in product instance table unsuccessful with error ", err, "ProductInstanceDao");
                   t.rollback();
                   this.handleError([err.message], callback)
                })
              }).catch(err => {
                log.error("parent process id updation in product instance table unsuccessful with error ", err, "ProductInstanceDao");
                t.rollback();
                this.handleError([errMsg], callback)
              })
          });
        }
        else {
          return this.db.sequelize.transaction(function (t) {
            return data.product.updateAttributes({ parent_process_id: req.body.parentProcessId }, { transaction: t })
              .then(() => {
                log.info("parent process id updated successfully in product instance table..", " ", "ProductInstanceDao");
                return Promise.all([fetchMileStoneId.call(this, req)]);
              })
              .then((milestoneConfig) => {
                var jsonObj = JSON.parse(JSON.stringify(milestoneConfig[0]))                
                var that = this;
                 return this.db.sequelize.Promise.map(jsonObj, function (obj) {
                    return that.db.process_milestones.build({
                      product_instance_id:req.body.productInstanceId,
                      parent_process_id: req.body.parentProcessId,
                      child_process_id: req.body.childProcessId,
                      milestone_id: obj.milestone_id,
                      sequence: obj.sequence,
                      status: "Pending",
                      added_by: "SYS",
                      added_date: new Date(),
                      updated_by: "SYS",
                      updated_date: new Date()
                    }).save({ transaction: t })
                  })
              })
               .then(() => {
                  return  updateWorkFlow.call(this, req).then(function(){
                    log.info("process milestone inserted successfuly..", " ", "ProductInstanceDao");
                     callback({ "isSuccessful": true });
                }).catch(err =>{
                   log.error("updation and insertion unsuccessful with error ", err, "ProductInstanceDa");
                   t.rollback();
                   this.handleError([err], callback)
                })
               })
              .catch(err => {
                log.error("updation and insertion unsuccessful with error ", err, "ProductInstanceDao");
                t.rollback();
                this.handleError([err.message], callback)
              })
          }.bind(this))
        }
      }
      else {
        errors.push(data.error);
        log.error('Error....', data.error, 'productInstanceDao')
        this.handleError(errors, callback)
      }
    }.bind(this));
  }
  catch (err) {
    log.error('Error caught..', err.message, 'productInstanceDao')
    this.handleError([errMsg], callback)
  }
}

var fetchMileStoneId = function (req) {

  return new Promise((resolve, reject) => {
    try {
      var finalMileStoneConfig = null;
      console.log(req.body.productType + ":" + req.body.productTier + ":" + req.body.transactionType + ":" + req.body.saleschannelcode);
      return this.db.milestone_configuration.findAll({
        where: {
          product_type: req.body.productType,
          product_tier: req.body.productTier,
          transaction_type: req.body.transactionType,
          sales_channel_code: req.body.saleschannelcode
        }
      })
      .then(function (milestoneConfig) {
        resolve(milestoneConfig);
      })
        /* .then(function (milestoneConfig) {
          if (milestoneConfig) {
            finalMileStoneConfig = milestoneConfig;
            return this.db.process_milestones.findAll(
              {
                where: { parent_process_id: req.body.parentProcessId },
                order: [['sequence', 'DESC']]
              })
          }
          else {
            log.info("Milestone config Not found....", null, 'productInstanceDao');
            reject("Milestone config not found..")
            //errMsg = "Milestone config not found with productType " + req.body.productType + " and productTier " + req.body.productTier + " and transactionType " + req.body.transactionType + " and saleschannelcode " + req.body.saleschannelcode + " does not exists"
          }
        }.bind(this))
        .then((processMileStone) => {
          var maxSequence = 1;

          if (processMileStone && processMileStone.length > 0) {
            maxSequence = parseInt(processMileStone[0].sequence) + 1;
          }
          for(var i=0; i<finalMileStoneConfig.length; i++){
                      finalMileStoneConfig[i].setDataValue('sequence', maxSequence);
          }
          resolve(finalMileStoneConfig);
        }) */
        .catch(function (err) {
          log.error("Error caught while fetching Milestone config", err, 'productInstanceDao');
          reject(err)
        }.bind(this))

    } catch (ex) {
      log.error("Error caught while fetching Milestone config not found", ex.message, 'productInstanceDao');
      reject(ex.message)
    }
  })

}

/**
  Method to update fullfilment_status for Suspend
  **params**
  itemid : product instance id of the product to update
  callback : response to send back
**/
ProductInstanceDao.prototype.handleInstanceStatus = function (itemid, instanceStatus, fulfilmentStatus, serviceStartDate, NotifyBilling, NotifySFFlag, type, callback) {

var updateAttributes ={};
if(serviceStartDate)
  updateAttributes = {instance_status: instanceStatus, workflow_status: fulfilmentStatus, service_start_date: serviceStartDate};
else
  updateAttributes = {instance_status: instanceStatus, workflow_status: fulfilmentStatus };

  fetchProduct.call(this, itemid, function (data) {
    var errors = [];
    if (data.status === "SUCCESS") {
      var product = data;
      var json = JSON.parse(JSON.stringify(data))
      var parsedData = JSON.stringify(JSON.parse(JSON.stringify(json.product)));
      return this.db.sequelize.transaction(function (t) {
        return data.product.updateAttributes(updateAttributes, { transaction: t })
          .then(function (entry) {
            this.handleSuccess(entry.get(), callback)
            /**esb Call */
            utils
              .esbcall(
              JSON.parse(parsedData).enterprise_item_id,
              JSON.parse(parsedData).product_instance_id,
              NotifyBilling,
              NotifySFFlag,
              JSON.parse(parsedData).instance_status
              ).then(esb => {
                if (esb == false) {//if we have errors then we get it as false
                  console.log(esb);                  
                }else{
                  if(NotifySFFlag == 'Y'){
                  utils.sfcall(type, itemid, serviceStartDate)
                  .then(data =>{
                    if(data==false){
                      log.error('Call to Sales force through ESB failed for EID : '+itemid)
                      this.handleError(error.response.esbServiceFault.exceptionDetail, callback)
                    }else
                      log.info('call to Sales force via ESB is successfull : '+itemid)

                  }).catch(error => {
                    if (error.response.hasErrorOrWarnings) {
                      console.log(error.response.esbServiceFault.exceptionDetail);
                      this.handleError(error.response.esbServiceFault.exceptionDetail, callback)
                    }
                    else{
                      console.log(error)
                    }
                  })
                }
                }
              })
              .catch(error => {
                if (error.response.sourceSystem = "BPMS") {
                  if (error.response.hasErrorOrWarnings) {
                    console.log(error.response.esbServiceFault.exceptionDetail);
                    this.handleError(error.response.esbServiceFault.exceptionDetail, callback)
                  }
                  else {
                    if (error.response.hasErrorOrWarnings) {
                      console.log(error.response.esbServiceFault.exceptionDetail);
                      this.handleError(error.response.esbServiceFault.exceptionDetail, callback)
                    }
                  }
                }
                console.log("error" + error)
              })
            /**esb Call */
          }.bind(this))
          .catch(function (err) {
            errors.push("Error caught while updating prodcut status on workflow completion ::" + err);
            log.error("Error caught while updating prodcut status on workflow completion :: " + itemid + " ", err, 'productInstanceDao')
            this.handleError(errors, callback);
          })
      }.bind(this))
    }
    else {
      errors.push(data.error);
      log.error('Error caught..', data.error, 'productInstanceDao')
      this.handleError(errors, callback)
    }
  }.bind(this));
}


/**
  Method to fetch product
  **params**
  itemid : product instance id of the product to fetch
  callback : response to send back
**/
var fetchProduct = function (itemid, callback) {
  try {
    this.db['product_instance'].findById(itemid)
      .then(function (product) {
        if (product) {
          log.debug("product Not found with productInstanceID ", product.product_instance_id, 'productInstanceDao')
          callback({
            "status": "SUCCESS",
            "product": product
          });
        }
        else {
          log.debug("product Not found with productInstanceID ", itemid, 'productInstanceDao');
          callback({
            "status": "ERROR",
            "error": "product Not found with productInstanceID " + itemid
          });
        }
      }.bind(this))
      .catch(function (err) {
        log.error("Error caught while fetching product with id " + itemid + " ", err, 'productInstanceDao');
        callback({
          "status": "ERROR",
          "error": itemid + " is not a valid product instance id"
        });
      }.bind(this))

  } catch (ex) {
    log.error("Error caught while fetching product with id " + itemid + " ", ex.message, 'productInstanceDao');
    callback({
      "status": "ERROR",
      "error": itemid + " is not a valid product instance id"
    });
  }
}

ProductInstanceDao.prototype.updateCancelCONV = function (enterpriseItemId, callback) {
  return this.db.sequelize.transaction(function (t) {
    return this.db['product_instance'].update({
      instance_status: 'UPD',
    }, {
        where: { enterprise_item_id: enterpriseItemId }
      }, { transaction: t })
      .then(function (entry) {
        this.handleSuccess('success', callback)
      }.bind(this))
      .catch(function (err) {
        log.error("Error caught while updating prodcut status on workflow completion :: " + itemid + " ", err, 'productInstanceDao')
        this.handleError(errors, callback);
      })
  }.bind(this))
}


ProductInstanceDao.prototype.updateBillingTriggerDate = function(req, callback){
  var that = this;
  return that.db.sequelize.transaction(function(t){
    return that.db['product_instance'].update({
      billing_trigger_date : req.params.date
    },{ where : {product_instance_id : req.params.id}, transaction:t})
    .then(result => {
      if(result[0] > 0){
        that.handleSuccess('success',callback)
      }
      else{
        that.handleError(['product_instance_id not found or billing trigger date already updated'], callback);
      }
    })
    .catch(error => {
      log.error("Error caught while updating billing trigger date for product instance id :: " + req.params.id + " ", error.message, 'productInstanceDao')
      that.handleError([error.message], callback);

    })
  })

}


var updateWorkFlow = function(req){
  return new Promise((resolve, reject) => {
    try {
    return workflowModel.max('sequence', { where: { instance_id: req.body.productInstanceId, transaction_type: req.body.transactionType } }).then(seq => {
        console.log("maximum number : " + seq)
        if (isNaN(parseFloat(seq))) {
          return resolve();
        } else {
          return workflowModel.update(
            { process_id: req.body.parentProcessId },
            {
              where:
              { instance_id: req.body.productInstanceId, transaction_type: req.body.transactionType, sequence: seq }
            }).then(function () {
              return resolve();
            }).catch(err => {
              return reject('Error updating the Work flow History status');
            })
        }
      }).catch(function (error) {
        log.error('Handling Error in updateWorkFlow for instnaceId: ' + req.body.productInstanceId, error, 'productInstanceDao :');
        return reject('Handling Error in updateWorkFlow for instnaceId: ' + req.body.productInstanceId, error, 'productInstanceDao :')
      })
    } catch (exception) {
      log.error('Handling Error in updateWorkFlow for instnaceId: ' + req.body.productInstanceId, error, 'productInstanceDao :');
      return reject('Handling Error in updateWorkFlow for instnaceId: ' + req.body.productInstanceId, error, 'productInstanceDao :')
    }
  })
};

/**
  Method to get the product instance header details for the given EID
  **params**
  req : request object received as part of client request
  callback : response to send back the enterprise Item details in header
**/
ProductInstanceDao.prototype.getProductInstanceByEnterPriseId = function (req, callback) {
  var errors = []
  try {
    this.db['product_instance'].findAll({
      where: {
        enterprise_item_id: req.params.enterpriseItemId
      },
      raw: true,
      attributes: [['product_instance_id', 'productinstance'],
        ['enterprise_account_id', 'enterpriseAccountId'],
        ['enterprise_item_id', 'enterpriseItemId'],
        ['business_location_id', 'businessLocationId'],
        ['product_type', 'producttype'],
        ['product_tier', 'productTier'],
        ['sales_channel_code', 'salesChannelCode'],
        ['recent_transaction_type', 'transactionType'],
        ['instance_status', 'instanceStatus'],
        ['workflow_status', 'fulfilmentStatus'],
        ['primary_item_id', 'primaryItemIdForAddon'],
        ['previous_item_id', 'previousItemId'],
        [this.db.Sequelize.fn('date_format', this.db.Sequelize.col('service_start_date'), '%Y-%m-%d'), 'serviceStartDate'],
        [this.db.Sequelize.fn('date_format', this.db.Sequelize.col('service_end_date'), '%Y-%m-%d'), 'serviceEndDate'],
        [this.db.Sequelize.fn('date_format', this.db.Sequelize.col('future_provision_date'), '%Y-%m-%d'), 'futureRequestedDate']
        ]
    })
      .then(data => {
        if (data.length != 0) {
          var ProductHeader = data[0]
          ProductHeader.ContentFlag = true;
          ProductHeader.ContentHistoryFlag = true ; 
          callback({ProductHeader})
        }
        else {
          errors.push('Item Id not found : ' + req.params.enterpriseItemId)
          log.error('Item Id not found', req.params.enterpriseItemId, 'EID')
          this.handleError(errors, callback)
        }
      }).catch(error => {
      errors.push('Retrieving Item : ' + req.params.enterpriseItemId + 'failed With error : ' + ' ' + error)
      log.error('Retrieving Item : ' + req.params.enterpriseItemId + 'failed With error : ' + ' ' + error, req.params.enterpriseItemId, 'EID')
      this.handleError(errors, callback)
    })
  } catch (ex) {
    errors.push('Exception occurred while retrieving the content for item Id : ' + req.params.enterpriseItemId + ex)
    log.error('Exception occurred while retrieving the content for item Id : ' + req.params.enterpriseItemId + ex, req.params.enterpriseItemId, 'EID')
    this.handleError(errors, callback)
  }
}
