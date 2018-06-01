'use strict';

var express = require('express')
  , request = require('request')
  , router  = express.Router()
  , config  = require('config')
  , log     = require('../logger');

router.get('/titan/product/:id', function(req, res, next) {
  request(
    {
      method: 'GET',
      url: [config.titanRestServiceUri, '/common/product/enterpriseItemId/', req.params.id].join(''),
      headers: {
        'Authorization': "Basic " + new Buffer([config.titanRestUriUserId, config.titanRestUriPassword].join(':')).toString("base64"),
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      json: true,
      rejectUnauthorized: false, // need this because self signed cert on server causes for call to fail
      requestCert: true,
      agent: false
    },
    function (error, response, body) {
      if(!error && response.statusCode == 200 && !body.isSuccessful) {
        res.json(body);
      } else {
        log.error("Exception caught", body, "/titan/product/" + req.params.id);
        res.status(500).json(body.error);
      }
    }
  );
});

module.exports = router;
