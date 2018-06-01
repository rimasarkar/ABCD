var db = require("../models");
var ProductConfigDao = require("../dao/ProductConfigDao");
var ESBExceptionDao = require("../dao/ESB_ExceptionDao");
var log = require('../logger');

var mileStoneDAO = require('../dao/milestoneDao');
exports.validate = function (req, response, callback) {
    var count = 0;
    for (var i = 0; i < req.body.Content.length; i++) {
        if (!req.body.Content[i].ProductInstanceId)
            response.error.push('Product Instance Id can not be null in ' + i + ' Object of Content')
        if (!req.body.Content[i].mileStoneId)
            response.error.push('Mile Stone Id can not be null in ' + i + ' Object of Content')
        if (!req.body.Content[i].sequenceNumber)
            response.error.push('Sequence Number Id can not be null in ' + i + ' Object of Content')
        if (!req.body.Content[i].mileStoneDescription)
            response.error.push('Mile Stone Description can not be null in ' + i + ' Object of Content')
        if (!req.body.Content[i].transactoinTypes)
            response.error.push('Transaction Types can not be null in ' + i + ' Object of Content')
        if (!req.body.Content[i].status)
            response.error.push('Status can not be null in ' + i + ' Object of Content')
        if (!req.body.Content[i].mileStoneType)
            response.error.push('Mile Stone Type can not be null in ' + i + ' Object of Content')
        if (!req.body.Content[i].addedBy)
            response.error.push('Added By  can not be null in ' + i + ' Object of Content')
        if (!req.body.Content[i].updatedBy)
            response.error.push('Updated By can not be null in ' + i + ' Object of Content')
        var getPromise = new Promise(function (resolve, reject) {
            var productInstanceId = req.body.Content[i].ProductInstanceId;
            mileStoneDAO.getMileStoneDetailsById(req.body.Content[i].ProductInstanceId, function (data) {
                if (data == null) {
                    log.error('Error while executing DB operations : Validation.js','','validations')
                    response.error.push('Error while executing DB operations')
                    resolve('Error while executing DB operations');
                }
                else if (data.length == 0)
                    resolve('POST Request from validation .js  :')
                else {
                    response.error.push('Reqest type should be PUT : ' + productInstanceId)
                    resolve('Reqest type should be PUT');
                }
                count++;
            })
        });
        Promise.all([getPromise]).then(function () {
            log.info("All Promises success, number of errors : "+response.error.length + " loop count ",i,'validations');
            if (count == req.body.Content.length)
                callback(response.error)
        }, function () {
            log.error("failed for few promises, number of errors : " + response.error.length + " loop count  ",i,'validations');
            if (count == req.body.Content.length)
                callback(response.error)
        });
    }
}

exports.ValidateFutureDatedProduct = function(req,callback){
var errors = [];
  try{
  if (!req.body.ProductHeader.enterpriseAccountId)
      errors.push('Enterprise Account Id can not be null or empty ')
  if (!req.body.ProductHeader.enterpriseItemId)
      errors.push('EnterpriseItemId can not be null or empty ')
  if (!req.body.ProductHeader.businessLocationId)
      errors.push('Business Location Id can not be null or empty ')
  if (!req.body.ProductHeader.salesChannelCode)
      errors.push('Sales Channel Code can not be null or empty ')
  if (!req.body.ProductHeader.futureRequestedDate)
      errors.push('Future Requested Date can not be null or empty')
  if (!req.body.ProductHeader.transactionType)
      errors.push('Transaction Type can not be null or empty')
  if (!req.body.ProductHeader.productType)
      errors.push('Product Type can not be null or empty')
  if (!req.body.ProductHeader.productTier)
      errors.push('Product Tier can not be null or empty')
  if (!req.body.ProductHeader.userId)
      errors.push('User Id can not be null or empty')
  //1) Valid transactions for future dated transactions are New, Upgrade, Downgrade, Cancel
  if(req.body.ProductHeader.transactionType && !isValidTransaction(req.body.ProductHeader.transactionType)){
        errors.push('Invalid Transaction Type Received..');
    }
  //2) Titan will not accept a future dated update transaction.
  if(req.body.ProductHeader.transactionType.toUpperCase() === "UPDATE"){
          errors.push('Transaction Type UPDATE is not accepted for Future Dated Items..');
    }
  if(errors.length > 0){
      callback("false",errors);
  }
  else{
      callback("true");
    }
  }
  catch(ex){
    log.info("Exception caught..", ex.message,'validations');
    errors.push(ex);
    callback("false",errors);
  }
}


var isValidTransaction = function(transactionType){
  if(transactionType.toUpperCase() === "NEW" || transactionType.toUpperCase() === "UPGRADE" ||
transactionType.toUpperCase() === "DOWNGRADE" || transactionType.toUpperCase() === "CANCEL"){
    return true;
  }
  else{
    return false;
  }
}


/*
Method to check if the corresponding transaction is allowed on the said product type.
If allowed transaction is valid , reroute the request, else return validation failure message.
*/
exports.validateTransaction = function(req, productType, productTier, transactionType, buslocationId, enterpriseAccountId){
  return new Promise((resolve, reject)=>{
  try{
    ProductConfigDao.getProductConfigDetails(productType,productTier,db["product_configuration"])
      .then(data => {
        var jsonObj = JSON.parse(JSON.stringify(data[0]))
        if(req.method.toUpperCase() === "PUT"){
        if(transactionType.toUpperCase() === "RESUME"){
          return jsonObj.allowResume === "Y" ? resolve() : reject('Transaction Type RESUME Not allowed for product ' + productType);
        }
        else if(transactionType.toUpperCase() === "CANCEL"){
          return jsonObj.allowCancel === "Y"  ? resolve() : reject('Transaction Type CANCEL Not allowed for product ' + productType);
        }
        else if(transactionType.toUpperCase() === "SUSPEND"){
          return jsonObj.allowSuspend === "Y"  ? resolve() : reject('Transaction Type SUSPEND Not allowed for product ' + productType);
        }
        else{
          if(jsonObj.allowUpdate === "Y"){
             isBlidOrEaidDuplicate.call(this, productType, productTier, buslocationId, enterpriseAccountId, jsonObj).then(function() {
                 return resolve()
                }).catch(err => {
                  return reject(err)
                }) 
          }else{
            return reject('Transaction Type UPDATE Not allowed for product ' + productType)
          }          
        }
      }
       else if(req.method.toUpperCase() === "POST"){
         if(transactionType.toUpperCase() === "NEW"){
           if(jsonObj.allowNew === "Y"  ){
            if(jsonObj.eaidFlag==='N' || jsonObj.blidFlag==='N' ){
                isBlidOrEaidDuplicate.call(this, productType, productTier, buslocationId, enterpriseAccountId, jsonObj).then(function() {
                 return resolve()
                }).catch(err => {
                  return reject(err)
                }) 
              } else
              {
                return resolve()
              }
           }else{
            return reject('Transaction Type NEW Not allowed for product ' + productType);
           }
           
         }
       }
       else{
         return reject('Invalid Request Method Received..');
       }

    })
    .catch(err =>{
      log.error("Exception caught while fetching product config detail for transaction type "+transactionType + " for product "+productType,err,"ValidateTransaction");
      return reject(err);
    })
  }
  catch(ex){
    log.error("Exception caught while validating request for transaction type "+transactionType + " for product "+productType,ex.message,"ValidateTransaction");
    return reject(ex.message);
  }
})

}

exports.isItemPendingWithFailedTransaction = function(itemId){
return new Promise((resolve,reject)=>{
  var  esbExceptionDao = new ESBExceptionDao(db);
    //check if item exists in product_to_process_errors or billing_sfdc_errors table
    var promiseProcessErros =  esbExceptionDao.getItemFromProductToProcessErrors(itemId);
    var promiseSfdcErrors = esbExceptionDao.getItemFromSFDCErrors(itemId);

    Promise.all([promiseProcessErros,promiseSfdcErrors]).then(data => {
      if (data[0].length != 0 || data[1].length != 0) {
            return reject("Cannot process this transaction as the previous transaction on this item is in error status.");
      }else {
            return resolve("Item does not exists");
      }
    },reason => {
      return reject(reason);
    });
})
}
var isBlidOrEaidDuplicate = function(productType, productTier, buslocationId, enterpriseAccountId, prodConfigDetails){  
 return new Promise((resolve,reject)=>{
  //var prodConfig =  ProductConfigDao.getProductConfigDetails(productType,productTier,db["product_configuration"]);
    var isBlidDuplicate = ProductConfigDao.isbusinessLocationIdDuplicate(productType,productTier,buslocationId, db["product_instance"],db);
    var isEaidDuplicate = ProductConfigDao.isEnterpriseAcoountIdDuplicate(productType,productTier,enterpriseAccountId, db["product_instance"],db);
 
  Promise.all([isBlidDuplicate, isEaidDuplicate]).then(data => {  
      if (prodConfigDetails.eaidFlag==='N') {
          if (data[0]==='Z') {
              return reject("Duplicate EnterpriseAccountID not allowed for ProductType "+productType +" and productTier "  +productTier);
          } 
          else return resolve("Duplicate EAID/BLID allowed");
        }
     else if ( prodConfigDetails.blidFlag==='N') {
          if (data[1]==='Y') {
              return reject("Duplicate BusinessLocationID not allowed for ProductType "+productType +" and productTier "  +productTier);
          } 
          else return resolve("Duplicate EAID/BLID allowed");
        }
      else {
            return resolve("Duplicate EAID/BLID allowed");
          }  
      
 },reason => {
      return reject(reason);
    });
})

}


  exports.validateESBExceptionData = function(req){
    return new Promise((resolve, reject) => {
      try{
        var errors = [];
        if(!req.body.productInstanceId && !req.body.enterpriseItemId){
          errors.push("productInstanceId/enterpriseItemId field cannot be null");
        }
        if(!req.body.url){
          errors.push("url field cannot be null");
        }
        if(!req.body.jsonObj){
          errors.push("jsonObj field cannot be null");
        }
       // if(!req.body.errorDescription){
         // errors.push("errorDescription field cannot be null");
        //}
        if(errors && errors.length > 0){
          return reject(errors)
        }
        else{
          return resolve(true);
        }
      }
      catch(err){
        return reject([err])
      }
    })

  }
