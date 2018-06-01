'use strict'
var log = require('../logger');
var errMsg = "Internal Server Error. Please Contact System Administrator."
var reqObj;
var db;
var model;
var AsDsDao = module.exports = function (db) {
    this.db = db;
}

/* Update the source account id with target account id with 
 * based on enterprise Item id  */
AsDsDao.prototype.accountMerge = function (req, callback) {
    try {
        model = this.db.product_instance;
        reqObj = req;
        if (req.body.sourceEnterrpiseIds) {
            if (req.body.sourceEnterrpiseIds.length > 0) {
                checkAccount(req.body.sourceAccount)
                    .then(data => {
                        if (data.length != 0) {
                            checkAccount(req.body.targetAccount)
                                .then(data => {
                                    if (data.length != 0) {
                                        Promise.all([req.body.sourceEnterrpiseIds.reduce(functionName, Promise.resolve())]).then((data) => {
                                            console.log('!@#$%^ : '+data.length);
                                            console.log('!@#$%^ : '+data);
                                            callback({ isSuccessful: true })
                                        }).catch(err => {
                                            callback({ isSuccessful: false, error: [err] })
                                        })
                                    } else {
                                        log.info("no data found for Target  account :", "ASDSDAO", req.body.targetAccount)
                                        callback({ isSuccessful: false, error: ['target Account not found ' + req.body.targetAccount] })
                                    }
                                }).catch(error => {
                                    log.error("Error while retriving information for target account :", "ASDSDAO", req.body.targetAccount)
                                    callback({ isSuccessful: false, error: ['target Account not found ' + req.body.targetAccount] })
                                })
                        } else {
                            log.info("no data found for source  account :", "ASDSDAO", req.body.sourceAccount)
                            callback({ isSuccessful: false, error: ['source Account not found ' + req.body.sourceAccount] })
                        }
                    }).catch(error => {
                        log.error("Error while retriving information for source account :", "ASDSDAO", req.body.sourceAccount)
                        callback({ isSuccessful: false, error: ['source Account not found ' + req.body.sourceAccount] })
                    })
            }
            else {
                callback({ isSuccessful: false, error: ["atlest one enterprise Item Id's need to be specified"] })
            }
        }
        else {
            return model.update({
                enterprise_account_id: reqObj.body.targetAccount,
                updated_by: 'TITAN',
                updated_date: new Date()
            }, { where: { enterprise_account_id: reqObj.body.sourceAccount } }
            ).then(function (t) {
                callback({ isSuccessful: true })
            }).catch(function (error) {
                log.error('Handling Error in updating ASDS for instnaceId: ' + reqObj.body.productInstanceId, error, 'ASDSDao :');
                callback({ isSuccessful: false, error: [err] })
            })
        }
    } catch (ex) {
        log.error('Error in update ASDS ' + req.body.sourceAccount, ex.message, 'AsDsDao');
        callback({ isSuccessful: false, error: [ex] })
    }
};

var functionName = function (prev, curr) {
    return prev.then(function () {
        return model.update({
            enterprise_account_id: reqObj.body.targetAccount,
            updated_by: 'TITAN',
            updated_date: new Date()
        }, { where: { enterprise_account_id: reqObj.body.sourceAccount, enterprise_item_id: curr.itemId } }
        ).then(function (t) {
            if(t>0)
            return Promise.resolve();
            else return Promise.reject('Souce Account is not tagged to Item Id ');
        }).catch(function (error) {
            log.error('Handling Error in ASDS for instnaceId: ' + reqObj.body.productInstanceId, error, 'ASDSDao :');
            return Promise.reject('Handling Error in ASDS for instnaceId: ' + reqObj.body.productInstanceId, error, 'productInstanceDao :')
        })
    })
};

var checkAccount = function (acctId) {
    return new Promise((resolve, reject) => {
        try {
            model.findAll({
                where: {
                    enterprise_account_id: acctId
                },
                raw: true,
                attributes: [
                    ['enterprise_account_id', 'enterpriseAccountId']
                ]
            }).then(function (data) {
                log.info('Account found ','chkAccount',acctId)
                return resolve(data)
            }).catch(function (error) {
                log.error('checkAccount get  failed' + error, acctId, 'PID')
                return reject(error)
            })
        } catch (ex) {
            log.error('Exception occurred while retrieving the content in ASDS for instance Id : ' + ex, acctId, 'PID')
            return reject(ex)
        }
    })
}