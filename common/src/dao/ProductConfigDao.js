var log = require('../logger');
var errMsg = ["Internal Server Error. Please Contact System Administrator."]


// Get Product Transaction details to check if the requested operation is allowed or not

exports.getProductConfigDetails = function (productType, productTier, model) {
  return new Promise((resolve, reject) => {
    try {
      model.findAll({
        where: {
          product_type : productType,
          product_tier : productTier,
          status : 'A'
        },
        attributes: [['product_type', 'productType'],
        ['product_tier', 'productTier'],
          ['allow_new_flag', 'allowNew'],
          ['allow_update_flag', 'allowUpdate'],
          ['allow_suspend_flag', 'allowSuspend'],
          ['allow_cancel_flag', 'allowCancel'],
          ['allow_resume_flag', 'allowResume'],
          ['dup_by_eaid_flag', 'eaidFlag'],
          ['dup_by_blid_flag', 'blidFlag']
        ]
      }).then(function (data) {
        if(data.length != 0)
        return resolve(data)
        else
        return reject("Product Config Details Not Found");
      }).catch(function (error) {
        log.error('Product Config Lookup failed with error',error,'ProductConfigDao')
        return reject(errMsg)
      })
    } catch(ex) {
      log.error('Exception occurred while retrieving the content in ProductConfigDao : ' , ex,'ProductConfigDao')
      return reject(errMsg);
    }
  })
}
exports.isbusinessLocationIdDuplicate = function (productType, productTier, busLocationId,model,db) {
  return new Promise((resolve, reject) => {
    try {
      model.findAll({
        where: {
          product_type : productType,
          product_tier : productTier,
          business_location_id:busLocationId,         
          workflow_status : {
            $ne: 'Cancel'
          }
        }    
      }).then(function (data) {
         if(data.length != 0)
        return resolve("Y")
        else
        return resolve("N");
      }).catch(function (error) {
        log.error('Product Duplicate Location Lookup failed with error',error,'ProductConfigDao and method isbusinessLocationIdDuplicate')
        return reject(errMsg)
      })
    } catch(ex) {
      log.error('Exception occurred while retrieving Product Duplicate Location ProductConfigDao : ' , ex,'ProductConfigDao method isbusinessLocationIdDuplicate')
      return reject(errMsg);
    }
  })
}
exports.isEnterpriseAcoountIdDuplicate = function (productType, productTier, enterpriseAccountId,model,db) {
  return new Promise((resolve, reject) => {
    try {
      model.findAll({
        where: {
          product_type : productType,
          product_tier : productTier,
          enterprise_account_id:enterpriseAccountId,                
          workflow_status : {
            $ne: 'Cancel'
          }
        }    
      }).then(function (data) {
         if(data.length != 0)
        return resolve("Z")
        else
        return resolve("N");
      }).catch(function (error) {
        log.error('Product Duplicate EnterpriseAccountId Lookup failed with error',error,'ProductConfigDao and method isEnterpriseAcoountIdDuplicate')
        return reject(errMsg)
      })
    } catch(ex) {
      log.error('Exception occurred while retrieving Product Duplicate Location ProductConfigDao : ' , ex,'ProductConfigDao method isEnterpriseAcoountIdDuplicate')
      return reject(errMsg);
    }
  })
}