'use strict'
var log = require('../logger');
var db = require('../models/index');
// Get authentication details to check if the userid and password are correct
module.exports.getAuthenticationDetails = function getAuthenticationDetails (userid, model) {
  return new Promise((resolve, reject) => {
    try {
      model.findAll({
        where: {
          username: userid,
          status: 'A'
        },
        attributes: [
          ['username', 'username'],
          ['password', 'password']
        ]
      }).then(function (data) {
        if (data.length != 0) {
          return resolve(data)
        }else {
          return reject('No Authentication Details for the given user')
        }
      }).catch(function (error) {
        log.error('Get Authentication Details Failed' + error, userid, 'USERID')
        return reject(error)
      })
    } catch (ex) {
      log.error('Exception occurred while retrieving the getAuthenticationDetails for item Id : ' + ex, userid, 'USERID')
      return reject(ex)
    }
  })
}

module.exports.limitedAuthentication = function limitedAuthentication (userid,pwd,model) {
  return new Promise((resolve, reject) => {
    try {
      model.findAll({
        where: {
          username: userid,
          password:pwd,
          status: 'A'
        },
        attributes: [
          ['username', 'username'],
          ['password', 'password']
        ]
      }).then(function (data) {
        if (data.length != 0) {
          return resolve(data)
        }else {
          return reject('No Authentication Details for the given user')
        }
      }).catch(function (error) {
        log.error('Get Authentication Details Failed' + error, userid, 'USERID')
        return reject(error)
      })
    } catch (ex) {
      log.error('Exception occurred while retrieving the getAuthenticationDetails for item Id : ' + ex, userid, 'USERID')
      return reject(ex)
    }
  })
} 
