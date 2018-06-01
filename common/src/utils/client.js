"use strict";

var request = require("request");
var log = require("../logger");
var fs = require("fs");
var path = require("path");

if(process.env.NODE_ENV !== 'SQLITE_TEST'){
var certFile = path.resolve(__dirname, '../config/ssl/' + process.env.NODE_ENV + '/cert.pem')
var certFiles = fs.readFileSync(certFile)
}
var esbOptions = function(endpoint,requestBody,method,authorization,enterpriseItemId) {
  return new Promise((resolve, reject) => {
    /** Pass the options for the request  that is sent */
    var options = {
      url: endpoint,
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      method: method,
      rejectUnauthorized: false,
      cert: certFiles,
      body: requestBody,
      timeout: 30000,
      json: true,
      jsonReviver: true
    };
    /** Call back to get the response that is sent */
    function callback(error, response, body) {
      try {
        if (error) {
          log.error("Call failed due to error " + error, "", "EID");
          return reject(error);
        }
        if (response) {
          if (response.statusCode == 200) {
            log.info(JSON.stringify(body), enterpriseItemId, "EID");
            return resolve(body);
          }
          if (response.statusCode == 401) {
            log.error(
              "Call failed due to Authorization error",
              enterpriseItemId,
              "EID"
            );
            return reject("Authorization error");
          } else {
            log.error(
              "Response from remote microservice..",
              response.statusCode,
              "EID"
            );
            return reject(body);
          }
        } else {
          log.error("Call failed due to unknown error", "UNKNOWN", "EID");
          return reject(
            "Please check if the site you are accessing is up and reachable."
          );
        }
      } catch (err) {
        log.error("Call failed due to exception ", "UNKNOWN", "EID");
        return reject(err.message);
      }
    }
    /** Make a request to send the data */
    request(options, callback);
  });
};

module.exports.esbOptions = esbOptions;
