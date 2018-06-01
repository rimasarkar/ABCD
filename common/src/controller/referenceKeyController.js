"use strict";

var log = require("../logger");
var errMsg = "Internal Server Error!! please contact system administrator";

var ReferenceKeyDao = require("../dao/referenceKeyDao");

module.exports.Controller = function(app, db, passport) {
  var referenceKeyDao = new ReferenceKeyDao(db);

  app.post("/common/get/referenceid", passport.ensureAuthenticated, function(
    req,
    res
  ) {
    referenceKeyDao
      .retriveReferenceDetails(req, db)
      .then(result => {
        res.json(result);
      })
      .catch(function(err) {
        console.log(err);
        log.error("exception occured for the request : " + req);
        res.status(500).json({
          isSuccessful: "false",
          error: [errMsg]
        });
      });
  });
};
