'use strict'
var ESBExceptionDao = require('../dao/ESB_ExceptionDao');
var validation = require('../utils/validations')
var util = require('../utils/util');

module.exports.Controller = function(app,db,passport){

var esbExceptionDao = new ESBExceptionDao(db);

app.post('/common/post/ESBAppianException', passport.ensureAuthenticated, function(req, res){

validation.validateESBExceptionData(req)
      .then(validationResult => {
        esbExceptionDao.insertESBException(req,'appian',function(status,result){
          if(status !== 200)
          res.status(status);
          res.json(result);
        });
      }).catch(validationErr => {
          util.handleError(400,validationErr,function(status,result){
              res.status(status);
              res.json(result);
          })
      })
  });

  app.post('/common/post/ESBSfdcException', passport.ensureAuthenticated, function(req, res){

validation.validateESBExceptionData(req)
        .then(validationResult => {
          esbExceptionDao.insertESBException(req,'sfdc',function(status,result){
            if(status !== 200)
            res.status(status);
            res.json(result);
          });
        }).catch(validationErr => {
            util.handleError(400,validationErr,function(status,result){
                res.status(status);
                res.json(result);
            })
        })
    });
}
