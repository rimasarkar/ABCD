'use strict'
var MilestoneDao = require("../dao/milestoneDao");

module.exports.Controller = function(app,db,passport){

var milestoneDao = new MilestoneDao(db);

app.post('/common/post/milestone', passport.ensureAuthenticated, function(req, res){
    milestoneDao.insertMilestone(req,function(result){
    res.json(result);
    });
  });

app.put('/common/put/milestone', passport.ensureAuthenticated, function(req, res){
    milestoneDao.updateMilestone(req,function(result){
    res.json(result);
    });
  });

  app.get('/common/retrieveMilestoneByProductType', passport.ensureAuthenticated, function(req,res){

      var errors = [];
      if(req.query===null || req.query === undefined ){
          errors.push("No Query Paramas Found..");
      }
      else if(req.query.productType === null || req.query.productType === undefined){
        errors.push("Product Type Not Found in URL..");
      }

      else if(req.query.productTier === null || req.query.productTier === undefined){
        errors.push("Product Tier Not Found in URL..");
      }

      else if(req.query.transactionType === null || req.query.transactionType === undefined){
        errors.push("Transaction Type Not Found in URL..");
      }

      else if(req.query.saleschannelcode === null || req.query.saleschannelcode === undefined){
        errors.push("saleschannel code  Not Found in URL..");
      }

      if(errors != null && errors.length > 0)
      {
        res.json({
          "isSuccessfull" : false,
          "error" : errors
        })
      }
      else
      {
        milestoneDao.retrieveMileStoneByProductType(req, function(result){
        res.json(result);
      })
    }

  })

}
