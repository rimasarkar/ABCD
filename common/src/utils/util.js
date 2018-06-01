'use strict'
if(process.env.NODE_ENV !== 'SQLITE_TEST'){
var config = require('../config/' + process.env.NODE_ENV + '.js')
}
var log = require('../logger')
var Client = require('./client')
const uuidV4 = require('uuid/v4')

var esbcall = function (enterpriseItemId, productInstaceId, NotifyBilling, NotifySFFlag, instanceStatus) {
  return new Promise((resolve, reject) => {
    /** Form the appian url to trigger the workflow in async */
    var esbcall = true;
    if (NotifySFFlag == 'Y' &&
      (NotifyBilling == 'STOP' | NotifyBilling == 'START')) {
      var Target = 'all'
      var url = '&billingstatus=' + NotifyBilling + '&status=' + instanceStatus
    } else if (NotifySFFlag == 'N' &&
      (NotifyBilling == 'STOP' | NotifyBilling == 'START')) {
      var Target = 'vision'
      var url = '&billingstatus=' + NotifyBilling
    } else if (NotifySFFlag == 'N' &&
      NotifyBilling == null) {
      esbcall = false;
    } else if (NotifySFFlag == 'Y' &&
      NotifyBilling == null) {
      var Target = 'sfdc'
      var url = '&status=' + instanceStatus
    }

    if (esbcall) {
      var esburl = config.esb + '&id=' + enterpriseItemId + '&target=' + Target + url + '&transactionid=' + uuidV4()
      log.info(esburl, enterpriseItemId, 'EID')
      Client.esbOptions(esburl, null, 'PUT', 'Basic ' + (new Buffer(config.esbuserid + ':' + config.esbpassword).toString('base64')), enterpriseItemId)
        .then(appian => {
          var appianHasNoErrors = true;
          if (appian.response.hasErrorOrWarnings === true) {
            appianHasNoErrors = false;
          }
          return resolve(appianHasNoErrors)
        })
        .catch(error => {
          return reject(error)
        })
    } else {
      return resolve(true)
    }
  })
}

module.exports.esbcall = esbcall


var sfcall = function (type, enterpriseItemId, fulfillDate) {
  return new Promise((resolve, reject) => {
    
      var json = {
        "type": type,
        "source": config.sourceSystem,
        "transactionId": uuidV4(),
        "enterpriseItemId": enterpriseItemId,
        "fulfillDate": fulfillDate
     }
      log.info(config.esb_sf, enterpriseItemId + 'EID',json)
      Client.esbOptions(config.esb_sf, json, 'PUT', 'Basic ' + (new Buffer(config.esbuserid + ':' + config.esbpassword).toString('base64')), enterpriseItemId)
        .then(salesForce => {
          var titanHasNoErrors = true;
          if (salesForce.response.hasErrorOrWarnings === true) 
            titanHasNoErrors = false;
          return resolve(titanHasNoErrors)
        })
        .catch(error => {
          return reject(error)
        })    
  })
}
module.exports.sfcall = sfcall

/*
Common Utility  methods to handle success and response callbacks
*/
module.exports.handleError = function (status, msg, callback) {
  callback(status, {
    isSuccessful: false,
    error: msg
  })
}

module.exports.handleSuccess = function (data, callback) {
  callback(200, {
    isSuccessful: true,
  })
}

/*
A common utility method for parsing strings, that is replacing '%s' parameters
with in the string passed as first paramter,
**params**
str --> string to be parsed
arguments --> parameters to be replaced with %s in the passed string.
*/
var parse = function (str) {
  try {
    var args = Array.prototype.slice.call(arguments, 1),
      i = 0;
    return str.replace(/%s/g, () => {
      return args[i++]
    });

  } catch (err) {
    console.log('Exception caught..' + err.messsage);
    throw err;
  }
}
module.exports.parse = parse;
