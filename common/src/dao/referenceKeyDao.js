"use strict";
var log = require("../logger");
var errMsg = "Internal Server Error. Please Contact System Administrator.";
var jsonArray = new Array();
var ReferenceKeyDao = (module.exports = function(db) {
  this.db = db;
});

ReferenceKeyDao.prototype.retriveReferenceDetails = function(req, db) {
  jsonArray = new Array();
  try {
    return new Promise((resolve, reject) => {
      return Promise.all([
        req.body.referenceObject.reduce(processEachObject, Promise.resolve(db))
      ])
        .then(result => {           
          var object = {};
          object.referenceObject = jsonArray;
          if (object.referenceObject.length  !== 0) {
          return resolve(object);
            }
            else{
                return resolve({"isSuccessful" : false, "error":["No Reference id found in Titan for the given Enterprise acct id/Business Location id"]});
            }
        })
        .catch(err => {
          log.error(
            "Error while processing the Common transaction for POST With error : " +
              err + req
          );
          return reject(err);
        });
    });
  } catch (err) {
    log.error(
      "Exception occured while getting data for the given reference Details : " +
        err
    );
  }
};

var processEachObject = function(prev, curr) {
  return new Promise((resolve, reject) => {
    return prev
      .then(function(db) {
        return db["reference_key_table"]
          .findAll({
            where: {
              object_type: curr.objectType,
              object_id: curr.objectId
            },
            attributes: [
              ["object_type", "objectType"],
              ["object_id", "objectId"],
              ["reference_id", "referenceId"]
            ]
          })
          .then(function(data) {
            if (data.length != 0) {
              jsonArray.push(data[0]);
              return resolve(db);
            } else {
              return resolve(db);
            }
          })
          .catch(function(error) {
            log.error(
              "Enterprise Account details  get  failed" + error,
              "",
              "id"
            );
            return reject(err);
          });
      })
      .catch(function(err) {
        log.error("Enterprise Account details  get  failed" + error, "", "id");
        return reject(err);
      });
  });
};
