'use strict'

var log = require('../logger');
var LookupInstanceStatusDao = module.exports = function(model) {
  this.lookupInstanceStatusModel = model;
}

LookupInstanceStatusDao.prototype.fetchInstanceStatusSetup = function(transactionType,pendingnewwf,callback) {
  var model = this.lookupInstanceStatusModel;
    try {
      model.findAll({
        where: {
          recent_transaction : transactionType,
          peding_new_wf      : pendingnewwf
        },
        attributes: [['peding_new_wf', 'PendingNewWF'],
          ['instance_status', 'InstanceStatus'],
          ['fulfilment_status', 'FulfilmentStatus'],
          ['notify_billing', 'NotifyBilling'],
          ['nofity_sf_flag', 'NotifySFFlag']
        ]
      }).then(function (data) {
          callback(data)
      }).catch(function (error) {

        log.error('Instance Status Setup get failed with error',error,'LookupInstanceStatusDao')
        callback(error)
      })
    } catch(ex) {
      log.error('Exception occurred while retrieving the content in getSeoFullfilmtdataById for item Id : ' , ex,'LookupInstanceStatusDao')
      callback(ex);
    }

}
