'use strict'
var log = require('../logger');
var errMsg = "Internal Server Error. Please Contact System Administrator."
var LookupProductMemoryDao = module.exports = function(model) {
  this.lookupProductMemoryModel = model;
}


LookupProductMemoryDao.prototype.fetchProductMemoryDetails = function(itemId,callback) {
  var model = this.lookupProductMemoryModel;
    try {
      model.findAll({
        where: {
          enterprise_item_id : itemId
        },
        attributes: [['product_type', 'ProductType'],
          ['product_tier', 'ProductTier']
        ]
      }).then(function (data) {
        if(data.length != 0)
        callback(true,data)
        else
        callback(false,"ItemId Not Found");
      }).catch(function (error) {
        log.error('Product Instance Memory Lookup get failed for itemId: '+itemId,error,'LookupProductMemoryDao')
        callback(false,errMsg)
      })
    } catch(ex) {
      log.error('Exception occurred while retrieving the content in LookupProductMemoryDao for item Id : '+itemId , ex,'LookupProductMemoryDao')
      callback(false,errMsg);
    }

}

LookupProductMemoryDao.prototype.fetchProductMemoryDetailsbyPID = function(instanceId,callback) {
  var model = this.lookupProductMemoryModel;
    try {
      model.findAll({
        where: {
          product_instance_id : instanceId
        },
        attributes: [['product_type', 'ProductType'],
          ['product_tier', 'ProductTier']
        ]
      }).then(function (data) {
        if(data.length != 0)
        callback(true,data)
        else
        callback(false,"InstanceId Not Found");
      }).catch(function (error) {
        log.error('Product Instance Memory Lookup get failed for iinstanceId: '+instanceId,error,'LookupProductMemoryDao')
        callback(false,errMsg)
      })
    } catch(ex) {
      log.error('Exception occurred while retrieving the content in LookupProductMemoryDao for instance Id : '+instanceId , ex,'LookupProductMemoryDao')
      callback(false,errMsg);
    }

}
