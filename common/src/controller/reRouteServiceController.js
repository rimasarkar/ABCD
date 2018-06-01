var ProductConfigDao = require("../dao/ProductConfigDao");
var LookupProductMemoryDao = require("../dao/lookupProductMemoryDao");
var DateUtil = require("../utils/DateUtil");
var client = require('../utils/client');
var validations = require('../utils/validations');
var log = require('../logger');
var config = require('../config/'+process.env.NODE_ENV);
var util = require('../utils/util');
var errMsg = ["Internal Server Error. Please Contact System Administrator."]
var execGitCmd = require('run-git-command');
var fs = require("fs");

module.exports.Controller = function(app,db,passport){

var lookupProductMemoryDao = new LookupProductMemoryDao(db['product_instance']);

/*
Rerouting the get request to downstream microservice which processes the actual
source request and sends back the response to this common service, which in turn
sends the response back to the source caller.
*/
app.get('/common/product/productinstanceid/:id',passport.ensureAuthenticated, function(req, res){
  try{
       lookupProductMemoryDao.fetchProductMemoryDetailsbyPID(req.params.id, function(result,data){
       if(result){
         var productType = data[0].get('ProductType');
         var productTier = data[0].get('ProductTier');
         var targetProductRestUrl = getTargetProductServiceUrl(productType,config.products,req.method+"-PID");
         if(targetProductRestUrl){
           targetProductRestUrl = util.parse(targetProductRestUrl,req.params.id);
           handleRerouting(req,res,productType,targetProductRestUrl);
         }
         else{
           log.error("endpoint service url not found for product: ",productType,"reRouteGetService");
           res.status(400).json({"isSuccessful":"false",
           "error":["No Service URL found for productType "+ productType]});
         }
       }
       else{
         log.error("Exception caught while fetching product type for instanceId: "+ req.params.id,data,"reRouteGetService");
         res.json({"isSuccessful":"false",
         "error":Array.isArray(data) ? data : [data]});
       }
     })
  }catch(err){
      log.error("Exception caught for instanceId: "+req.params.id,err.message,"reRouteGetService");
      res.status(500).json({"isSuccessful":"false",
      "error":errMsg});
    }
  })

/*
Rerouting the get request to downstream microservice which processes the actual
source request and sends back the response to this common service, which in turn
sends the response back to the source caller.
*/
app.get('/common/product/enterpriseItemId/:id',passport.ensureAuthenticated, function(req, res){
 try{
      lookupProductMemoryDao.fetchProductMemoryDetails(req.params.id, function(result,data){
      if(result){
        var productType = data[0].get('ProductType');
        var productTier = data[0].get('ProductTier');
        var targetProductRestUrl = getTargetProductServiceUrl(productType,config.products,req.method);
        if(targetProductRestUrl){
          targetProductRestUrl = util.parse(targetProductRestUrl,req.params.id);
          handleRerouting(req,res,productType,targetProductRestUrl);
        }
        else{
          log.error("endpoint service url not found for product: ",productType,"reRouteGetService");
          res.status(400).json({"isSuccessful":"false",
          "error":["No Service URL found for productType "+ productType]});
        }
      }
      else{
        log.error("Exception caught while fetching product type for itemId: "+ req.params.id,data,"reRouteGetService");
        res.json({"isSuccessful":"false",
        "error":Array.isArray(data) ? data : [data]});
      }
    })
 }catch(err){
     log.error("Exception caught for itemId: "+req.params.id,err.message,"reRouteGetService");
     res.status(500).json({"isSuccessful":"false",
     "error":errMsg});
   }
 })


/*
Rerouting the post request to downstream microservice which actually processes the source
request and sends back the response to this common service which in turn sends the
response back to the source caller.
*/
app.post('/common/post/product',passport.ensureAuthenticated,function(req, res){
 try{
       if(req.body.ProductHeader.productType && req.body.ProductHeader.productTier){
         var validatePromise =validations.validateTransaction(req,req.body.ProductHeader.productType,req.body.ProductHeader.productTier,"NEW", req.body.ProductHeader.businessLocationId,req.body.ProductHeader.enterpriseAccountId)
         var itemAlreadyHeldPromise =validations.isItemPendingWithFailedTransaction(req.body.ProductHeader.enterpriseItemId)
      // var isdup=validations.isBlidOrEaidDuplicate(req.body.ProductHeader.productType,req.body.ProductHeader.productTier,req.body.ProductHeader.businessLocationId,req.body.ProductHeader.enterpriseAccountId)
       
         Promise.all([validatePromise,itemAlreadyHeldPromise]).then(data=>{
           var targetProductRestUrl = getTargetProductServiceUrl(req.body.ProductHeader.productType, config.products,req.method);
           if(targetProductRestUrl){
             handleRerouting(req,res,req.body.ProductHeader.productType,targetProductRestUrl);
           }
           else{
             log.error("endpoint service url not found for product: ",req.body.ProductHeader.productType,"reRoutePostService");
             res.status(400).json({"isSuccessful":"false",
             "error":["No Service URL found for productType "+ req.body.ProductHeader.productType]});
           }
         }).catch(err =>{
           log.error("validation error, for transaction type NEW for itemId: "+req.body.ProductHeader.enterpriseItemId,err,"ValidateTransaction");
           res.status(400).json({"isSuccessful":"false",
           "error":[err]});
         })

       }
       else{
          res.status(400).json({"isSuccessful":"false",
          "error":["product type not found in request payload.."]})
        }

    }catch(err){
     log.error("Exception caught for itemId: "+req.body.ProductHeader.enterpriseItemId,err.message,"reRoutePostService");
     res.status(500).json({"isSuccessful":"false",
     "error":errMsg});
    }
 })


/*Rerouting the PUT request to downstream microservice which processes the actual
 source request and sends back the response to this common service which in turn
 sends the response back to the source caller.
 */
 app.put('/common/put/product',passport.ensureAuthenticated, function(req, res){
  try{
     if(req.body.ProductHeader.productType && req.body.ProductHeader.productTier)
     {
       var validatePromise = validations.validateTransaction(req,req.body.ProductHeader.productType,req.body.ProductHeader.productTier,"UPDATE")
       var itemAlreadyHeldPromise =validations.isItemPendingWithFailedTransaction(req.body.ProductHeader.enterpriseItemId)
       Promise.all([validatePromise,itemAlreadyHeldPromise]).then(data=>{
         var targetProductRestUrl = getTargetProductServiceUrl(req.body.ProductHeader.productType, config.products,req.method);
         if(targetProductRestUrl){
           handleRerouting(req,res,req.body.ProductHeader.productType,targetProductRestUrl);
         }
         else{
           log.error("endpoint service url not found for product: ",req.body.ProductHeader.productType,"reRouteUpdateService");
           res.status(400).json({"isSuccessful":"false",
           "error":["No Service URL found for productType: "+ req.body.ProductHeader.productType]});
         }
       }).catch(err=>{
         log.error("validation error for transaction type UPDATE for itemId: "+req.body.ProductHeader.enterpriseItemId,err,"ValidateTransaction");
         res.status(400).json({"isSuccessful":"false",
         "error":[err]});
       })


     }
     else{
           res.status(400).json({"isSuccessful":"false",
           "error":["product type not found in request payload.."]})
     }
    }catch(err){
      log.error("Exception caught for itemId: "+req.body.ProductHeader.enterpriseItemId,err.message,"reRouteUpdateService");
      res.status(500).json({"isSuccessful":"false",
      "error":errMsg});
    }
  })

/*
  Rerouting the PUT SUSPEND request to downstream microservice which processes the actual
  source request and sends back the response to this common service which in turn
  sends the response back to the source caller.
  */
 app.put('/common/put/enterpriseItemId/:id/suspend',passport.ensureAuthenticated,function(req,res){
   try{
    lookupProductMemoryDao.fetchProductMemoryDetails(req.params.id, function(result,data){
    if(result){
     var productType = data[0].get('ProductType');
     var productTier = data[0].get('ProductTier');
     var validatePromise = validations.validateTransaction(req,productType, productTier, "SUSPEND");
    // var itemAlreadyHeldPromise =validations.isItemPendingWithFailedTransaction(req.params.id)
    // Promise.all([validatePromise, itemAlreadyHeldPromise]).then(data=>{
      Promise.all([validatePromise]).then(data=>{
       var targetProductRestUrl = getTargetProductServiceUrl(productType, config.products,req.method+'-SUSPEND');
       if(targetProductRestUrl){
         targetProductRestUrl = util.parse(targetProductRestUrl,req.params.id);
         handleRerouting(req,res,productType,targetProductRestUrl);
       }
       else{
         log.error("endpoint service url not found for product: ",productType,"reRouteSuspendService");
         res.status(400).json({"isSuccessful":"false",
         "error":["No Service URL found for productType "+ productType]});
       }
     }).catch(err=>{
       log.error("validation error for transaction type SUSPEND for product: "+productType,err,"ValidateTransaction");
       res.status(400).json({"isSuccessful":"false",
       "error":[err]});
     })

   }
   else{
     log.error("Exception caught while fetching product type for itemId: "+req.params.id,data,"reRouteSuspendService");
     res.json({"isSuccessful":"false",
     "error":Array.isArray(data) ? data : [data]});
   }
   })
  }catch(err){
      log.error("Exception caught for itemId: "+req.params.id,err.message,"reRouteSuspendService");
      res.status(500).json({"isSuccessful":"false",
      "error":errMsg});
    }
   });


  /*
  Rerouting the PUT CANCEL request to downstream microservice which processes the actual
  source request and sends back the response to this common service which in turn
  sends the response back to the source caller.
  */
 app.put('/common/put/enterpriseItemId/:id/cancel',passport.ensureAuthenticated,function(req,res){
   try{
    lookupProductMemoryDao.fetchProductMemoryDetails(req.params.id, function(result,data){
    if(result){
     var productType = data[0].get('ProductType');
     var productTier = data[0].get('ProductTier');
     var validatePromise = validations.validateTransaction(req,productType,productTier,"CANCEL");
    // var itemAlreadyHeldPromise =validations.isItemPendingWithFailedTransaction(req.params.id)
     //Promise.all([validatePromise, itemAlreadyHeldPromise]).then(data=>{
      Promise.all([validatePromise]).then(data=>{
        var targetProductRestUrl = getTargetProductServiceUrl(productType, config.products,req.method+'-CANCEL');
        if(targetProductRestUrl){
          targetProductRestUrl = util.parse(targetProductRestUrl,req.params.id);
          handleRerouting(req,res,productType,targetProductRestUrl);
        }
        else{
          log.error("endpoint service url not found for product: ",productType,"reRouteCancelService");
          res.status(400).json({"isSuccessful":"false",
          "error":["No Service URL found for productType "+ productType]});
        }
     })
     .catch(err=>{
       log.error("validation error for transaction type CANCEL for itemId: "+req.params.id,err,"ValidateTransaction");
       res.status(400).json({"isSuccessful":"false",
       "error":[err]});
     })

   }
   else{
     log.error("Exception caught while fetching product type for itemId: "+req.params.id,data,"reRouteCancelService");
     res.json({"isSuccessful":"false",
     "error":Array.isArray(data) ? data : [data]});
   }
   })
  }catch(err){
      log.error("Exception caught for itemId: "+req.params.id,err.message,"reRouteCancelService");
      res.status(500).json({"isSuccessful":"false",
      "error":errMsg});
    }
   });



 /*
 Rerouting the PUT RESUME request to downstream microservice which processes the actual
 source request and sends back the response to this common service which in turn
 sends the response back to the source caller.
 */
 app.put('/common/put/enterpriseItemId/:id/RESUME',passport.ensureAuthenticated, function(req, res){
    try{
        lookupProductMemoryDao.fetchProductMemoryDetails(req.params.id, function(result,data){
        if(result){
          var productType = data[0].get('ProductType');
          var productTier = data[0].get('ProductTier');
          var validatePromise = validations.validateTransaction(req,productType,productTier,"RESUME");
         // var itemAlreadyHeldPromise =validations.isItemPendingWithFailedTransaction(req.params.id)
         // Promise.all([validatePromise, itemAlreadyHeldPromise]).then(data=>{
          Promise.all([validatePromise]).then(data=>{
            var targetProductRestUrl = getTargetProductServiceUrl(productType, config.products,req.method+'-RESUME');
            if(targetProductRestUrl){
              targetProductRestUrl = util.parse(targetProductRestUrl,req.params.id);
              handleRerouting(req,res,productType,targetProductRestUrl);
            }
            else{
              log.error("endpoint service url not found for product: ",productType,"reRouteResumeService");
              res.status(400).json({"isSuccessful":"false",
              "error":["No Service URL found for productType "+ productType]});
            }
          }).catch(err => {
            log.error("validation failed for transaction type RESUME for itemId: "+req.params.id,err,"ValidateTransaction");
            res.status(400).json({"isSuccessful":"false",
            "error":[err]});
          })

        }
        else{
          log.error("Exception caught in PUT RESUME request while fetching product type for itemId: "+req.params.id,data,"reRouteResumeService");
          res.json({"isSuccessful":"false",
          "error":Array.isArray(data) ? data : [data]});
        }
  })
 } catch(err){
     log.error("Exception caught in PUT RESUME request for itemId: "+req.params.id,err.message,"reRouteResumeService");
     res.status(500).json({"isSuccessful":"false",
     "error":errMsg});
   }
 })

app.post('/common/post/product/rawQuery', passport.limitedAuth, function (req, res) {
  console.log('Query executed from raw sequalizer '+req.body.query+'');
  db.sequelize.query(req.body.query+'').then(function(data) {
  log.info(' '+data.length+' ','number of records : ','Data Retrived from the query : '+JSON.stringify(data[0]))
  res.status(200).json(data[0]);  
    }).catch(err => {
  console.log('err : '+err)
  res.status(400).json(err)  
    })
});

/*Command line interface to read the file in the git */
  app.post('/common/post/fileProperties', passport.limitedAuth, function (req, res) {
    if (req.body.path) {
      try {
        fs.stat(req.body.path, function (err, stats) {
          res.status(200).json({ "chekout time": stats.ctime, "modified time ": stats.mtime })
        })
      } catch (err) {
        res.status(400).json({ "issuccessfull": "false", "Error": "" + err })
      }
    } else if (req.body.getContent) {
      execGitCmd(["show", req.body.getContent], "Running test commands!!")
        .then((result) => {
          res.status(200).json(result)
        }).catch((err) => {
          res.status(400).json({ "issuccessfull": "false", "Error": "" + err })
        })
    } else if (req.body.memUsage) {
      try {
        res.status(200).json(process.memoryUsage())
      } catch (err) {
        res.status(400).json({ "issuccessfull": "false", "Error": "" + err })
      }
    }
})
}

/*
Rerouting method used to reroute http request to the corresponding downstream microservice
*/
var handleRerouting= function(req,res,productType,targetProductRestUrl){

     log.info("Redirecting to endpoint microservice for product",productType,"reRouteServicePostController");
     var promiseObj = client.esbOptions(targetProductRestUrl,req.body,req.method,req.headers.authorization,'');
     Promise.all([promiseObj]).then(function(result){
       log.info("response received from microservice for product: ",productType,"reRouteServicePostController");
       if(result && result.length != 0)
       res.json(result[0]);
     }).catch(function(err){
       log.error("error thrown from microservice for product: "+productType,err,"reRouteServicePostController");
       res.status(500).json({"isSuccessful":"false",
       "error" : errMsg});
     })
}


/*
Method to fetch the target microservice url for the product configured in env configuration file
**params**
productType : name of the product having associated downstream url in config file
productUrlArray : array of all product objects with key as product name and value with associated microservice url
requestType : actual requestType (GET, POST, PUT),
*/
var getTargetProductServiceUrl = function(productType, productUrlArray, requestType){
  try{
    log.info("fetching url for key: ",productType.toUpperCase()+'-'+requestType.toUpperCase(),"reRouteServiceController");
    if(productUrlArray.hasOwnProperty(productType.toUpperCase()+'-'+requestType.toUpperCase()))
      return productUrlArray[productType.toUpperCase()+'-'+requestType.toUpperCase()];
    else
      return null;
  }
  catch(err){
    log.error("Exception caught while fetching url for product: "+productType,err,"reRouteServicePostController");
    return null;
  }
}



// var isProductFutureDated = function(productFutureDate){
//   // Titan will not treat future dated less than 24 hours as future dated transaction
//   var futureDate = DateUtil.toDate(productFutureDate , 'yyyy-MM-dd')
//   var todayDate = new Date();
//   // future dated item date should be greater than 24 hours from now.
//   todayDate.setDate(todayDate.getDate() + 1);
//   if (futureDate > todayDate){
//     return true;
//   }
//   else{
//     return false;
//   }
//
// }
