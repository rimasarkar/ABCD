'use strict'
var DateUtil = require("../utils/DateUtil");
var log = require('../logger');
var FutureDatedProductDao = module.exports = function(db) {
  this.db = db;
}

FutureDatedProductDao.prototype.handleError = function(msg, callback) {
  callback({
    isSuccessfull: 'false',
    message: msg
  })
}

FutureDatedProductDao.prototype.handleSuccess = function(data, callback) {
  callback({
    isSuccessfull: 'true',
    data:   data
  })
}


var futureDatedItemExistsWithNewStatus= function(enterpriseId) {
  return new Promise(function(resolve, reject){
    try{
      this.db['future_dated_items'].findAll({
            where: {
              enterprise_item_id: enterpriseId,
              future_dated_item_status: 'NEW'
            }
          }).then(function(data){
          if(data.length != 0){
            var jsonObj = JSON.parse(JSON.stringify(data[0]))
            return resolve("true")
          }
          else
            return reject("false");
      }).catch(function(err){
        log.error('Exception caught in FutureDatedProduct DAO..',err,'FUTURE DATED PRODUCT DAO')
        return reject(err)
      })
    }
    catch(ex){
      log.error('Exception occurred while processing the content for item Id : ' + enterpriseId,ex,'Future dated product dao');
      return reject(ex)
  }
}.bind(this))
}

/**
  Method to update fullfilment_status for Suspend
  **params**
  itemid : product instance id of the product to update
  callback : response to send back
**/
FutureDatedProductDao.prototype.insertFutureDateditems= function(req,callback) {
  try
  {
    var errors = []
    // futureDatedItemExistsWithNewStatus.call(this,req.body.ProductHeader.enterpriseItemId).
    // then(function(result){
    //   errors.push('Iteam Allready exists with NEW status for :' + req.body.ProductHeader.enterpriseItemId)    ;
    //   this.handleError(errors, callback)
    // }.bind(this)).catch(function(err){
    //   if(err === "false"){
      saveFutureDatedProduct.call(this,req).
          then(function(result){
              this.handleSuccess(result, callback)
          }.bind(this)).
            catch(function(err){
              log.error('Error While processing Item  : ' + req.body.ProductHeader.enterpriseItemId, err,'FutureDatedProductDao');
              errors.push('Error While processing Item  : ' + req.body.ProductHeader.enterpriseItemId + ' With error : ' + ' ' + err)
              this.handleError(errors, callback)
          }.bind(this))
      // }
      // else{
      //   console.log('Error While processing Item  : ' + req.body.ProductHeader.enterpriseItemId + ' With error : ' + ' ' + err)
      //   errors.push('Error While processing Item  : ' + req.body.ProductHeader.enterpriseItemId + ' With error : ' + ' ' + err)
      //   this.handleError(errors, callback)
      // }
    //}.bind(this))
  }
  catch(ex)
  {
    log.error('Exception occurred while processing the content for item Id : ' + req.body.ProductHeader.enterpriseItemId,ex.message,'FutureDatedProductDao')
    errors.push('Exception occurred while processing the content for item Id : ' + req.body.ProductHeader.enterpriseItemId + ex)
    this.handleError(errors, callback)
  }
}


/**
  Method to save FutureDatedProduct
**/
 var saveFutureDatedProduct = function(req) {
 return new Promise(function(resolve, reject){
 try {
         return this.db.sequelize.transaction(function (t) {
         var futureDateItemsPromise = this.db['future_dated_items'].create({
           enterprise_item_id: req.body.ProductHeader.enterpriseItemId,
           future_dated_item_status: 'NEW',
           content_json:req.body,
           future_provision_date: req.body.ProductHeader.futureRequestedDate,
           transaction_type: req.body.ProductHeader.transactionType,
           product_type: req.body.ProductHeader.productType,
           product_tier: req.body.ProductHeader.productTier,
           added_by: req.body.ProductHeader.userId,
           added_date: new Date(),
           updated_by: req.body.ProductHeader.userId,
           updated_date: new Date()
        }, { transaction: t });
       return Promise.all([futureDateItemsPromise]).then(function (data) {
           log.info('futureDateitems Item saved successfully.','futureDatedProductDao')
           return resolve(data);
        }).catch(function (err) {
         log.error('Error while processing the promise futuredateditem '+ req.body.ProductHeader.enterpriseItemId+' With error : ',err,'futureDatedProductDao')
         t.rollback()
         return reject(err);
       })
     }.bind(this))
 }
 catch(err){
   log.error('Exception caught for item '+ req.body.ProductHeader.enterpriseItemId+' With error : ',err,'futureDatedProductDao')
     return reject(err)
 }
}.bind(this))
}
