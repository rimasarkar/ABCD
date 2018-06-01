'use strict'
var log = require('../logger');
var ProductInstanceDao = require("../dao/productInstanceDao");
var LookupInstanceStatusDao = require("../dao/LookupInstanceStatusDao");
var DateUtil = require("../utils/DateUtil");
var errMsg = "Internal Server Error!! please contact system administrator";

module.exports.Controller = function (app, db, passport) {

    var lookupInstanceStatusDao = new LookupInstanceStatusDao(db['product_instance_status_setup']);
    var productInstanceDao = new ProductInstanceDao(db);

        /*
    method to fetch all item id's from product instance memory table..
    */
    app.get('/common/get/allitemids',passport.ensureAuthenticated, function(req,res){
        
               try{
                 log.info('GET all itemids ::','-','productInstanceController');
                 productInstanceDao.getAllItemIds(function (result) {
                     res.json(result)
                 })
               }
               catch(err){
                 log.error("Exception caught ", err.message, "productInstanceController");
                 res.status(500).json({
                     "isSuccessful": "false",
                     "error": [errMsg]
                 });
               }
        
            })
        
    app.put('/common/put/updatestatus/:id/:transactiontype/pendingnewwf/:pendingnewwf/fulfilmentdate/:fulfilmentdate', passport.ensureAuthenticated, function (req, res) {
    var serviceStartDate, type;
    //app.put('/common/put/updatestatus/:id/:transactiontype', passport.ensureAuthenticated, function (req, res) {
        log.info('TransactionType received ::', req.params.transactiontype, 'productInstanceController');
        try {

            lookupInstanceStatusDao.fetchInstanceStatusSetup(req.params.transactiontype,req.params.pendingnewwf, function (data) {
                if (data.length > 0) {
                var instanceStatus = data[0].get('InstanceStatus'); 
                // if instnace status is new then we shuld update the service start date as the date you get the request                
                if(instanceStatus.toUpperCase() === "NEW")                
                if(DateUtil.isValidFormat(req.params.fulfilmentdate))
                serviceStartDate = req.params.fulfilmentdate;
                else
                throw new DateUtil.DateException('Incorrect datetime value: '+req.params.fulfilmentdate+' should be in yyyy-MM-dd format.');
                else serviceStartDate = null;                
                var fulfilmentStatus = data[0].get('FulfilmentStatus');
                var NotifyBilling = data[0].get('NotifyBilling');
                var NotifySFFlag = data[0].get('NotifySFFlag');                
                if(req.params.transactiontype.toUpperCase() == "CANCEL")
                type = req.params.transactiontype.toUpperCase()
                else
                type="PUBLISH";
                productInstanceDao.handleInstanceStatus(req.params.id, instanceStatus, fulfilmentStatus, serviceStartDate, NotifyBilling, NotifySFFlag, type, function (result) {
                    res.json(result);
                })
            }else {
                log.error("No Data Found in Product Instance Setup");
                res.status(500).json({
                    "isSuccessful": "false",
                    "error": "No Data Found in Product Instance Setup"
                });                
              }

        })
        } catch (err) {
            res.json("{error}");
        }

    });
    /*
     Micro service for updating the product instance table with cancel status for conversions(V2T)
     of PUT CANCEL-CONVERSION.
     */
    app.put('/common/put/enterpriseItemId/:id/cancelConv', passport.ensureAuthenticated, function (req, res) {
        try {
            productInstanceDao.updateCancelCONV(req.params.id, function (status) {
                res.json(status)
            })
        } catch (err) {
            log.error("Exception caught : ", err.message, "productInstanceController");
            res.status(500).json({
                "isSuccessful": "false",
                "error": [errMsg]
            });
        }
    });

    /*
     Micro service for updating current appian process instance id in product_instance table along with corresponding milestones
     insertion in process_milestones table.
     */
    app.put('/common/put/processInstance', passport.ensureAuthenticated, function (req, res) {
        try {

          // start validation for required fields..
          var validationErrors = [];
          if(!req.body.productType)
          {
            validationErrors.push("product type not found in request body");
          }
          if(!req.body.productTier){
            validationErrors.push("product tier not found in request body");
          }
          if(!req.body.transactionType){
            validationErrors.push("transaction type not found in request body");
          }
          if(!req.body.productInstanceId){
            validationErrors.push("product instance id not found in request body");
          }
          if(!req.body.parentProcessId){
            validationErrors.push("parent process id not found in request body");
          }
          if(!req.body.childProcessId){
            validationErrors.push("child process id not found in request body");
          }
          if(!req.body.workflowRestarted){
            validationErrors.push("workflow restarted flag not found in request body");
          }
          // end validation
          if(validationErrors.length>0){
            res.json({"isSuccessful" : false,
                      "error" : validationErrors});
          }
          else{
            productInstanceDao.upsertProductMilestone(req, function (status) {
                res.json(status)
            })
          }
        } catch (ex) {
            log.error("Exception caught ", ex.message, "productInstanceController");
            res.status(500).json({
                "isSuccessful": "false",
                "error": [ex.message]
            });
        }
    });


    /**
    update billing trigger date for each product instance as per the PUT request received, with required details in query params
    */
    app.put('/common/product/updatebilldate/productinstanceid/:id/date/:date',passport.ensureAuthenticated,function(req,res){

      try{
        if(DateUtil.isValidFormat(req.params.date)){
          productInstanceDao.updateBillingTriggerDate(req,function(result){
            res.json(result);
          })
        }
        else
        {
          throw new DateUtil.DateException('Incorrect datetime value: '+req.params.date+' should be in yyyy-MM-dd format.');
        }
      }

      catch(ex){
        log.error("Exception caught: "+ex.message, '-', "productInstanceController");
        res.status(200).json({
            "isSuccessful": "false",
            "error": [ex.message]
        });
      }

    })

    /** Get service to get item details
        * This service return the product instance data with all
        * the latest content info associated to that Item in Titan
        *  **params**
            req : enterprise item id 
            res : product instance data in Json format
    */
    app.get('/common/product/instanceheaderdata/enterpriseItemId/:enterpriseItemId', passport.ensureAuthenticated, function (req, res) {
        if (req.params.enterpriseItemId === null || req.params.enterpriseItemId === undefined) {
          log.error('Bad Request. Item id Can not be null', req.params.enterpriseItemId, 'EID')
          res.status(400).json({ isSuccessful: false,
          error: ['Bad Request. Item id Can not be null']})
        }else {
          productInstanceDao.getProductInstanceByEnterPriseId(req, function(result){
            res.json(result);
          })}
      })
    
}
