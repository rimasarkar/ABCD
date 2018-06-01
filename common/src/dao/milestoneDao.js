'use strict'
var log = require('../logger');
var errMsg = "Internal Server Error. Please Contact System Administrator."
var MilestoneDao = module.exports = function(db) {
  this.db = db;
}

MilestoneDao.prototype.handleError = function(msg, callback) {
  callback({
    isSuccessful:  false,
    error: msg
  })
}

MilestoneDao.prototype.handleSuccess = function(data, callback) {
  callback({
    isSuccessful:  true,
    //data:   datak
  })
}

/**
Method to retrieve MileStone for a specific product type and Tier
params : "req" --> http request object with request params
         "callback" --> callback response method for success and failure.
**/
// MilestoneDao.prototype.retrieveMileStoneByProductType = function(req, callback){
//   try{
//
//   this.db.milestone_configuration.findAll({where:{product_type:req.query.productType,
//   product_tier:req.query.productTier,
//   transaction_type:req.query.transactionType,
//   status:"A"},
//   attributes:[['milestone_id','mileStoneId'],'sequence'],raw:true}).then(function(milestoneConfig){
//     if (milestoneConfig && milestoneConfig.length !== 0) {
//       Promise.all(milestoneConfig.map(function(element){
//         var jsonObj = JSON.parse(JSON.stringify(element))
//           return this.db.milestone_setup.findOne({where:{milestone_id:jsonObj.mileStoneId},
//             attributes:['milestone_description']}).then(function(milestoneSetup){
//                 jsonObj.mileStoneDescription = (milestoneSetup && milestoneSetup.length !== 0)?
//                 milestoneSetup.milestone_description : "";
//               return jsonObj;
//             })
//       }.bind(this))).then(function(result){
//         console.log(result);
//         callback({"isSuccessful" : true, "mileStones":result});
//       }).catch(function(err){
//         log.error("Error caught while retrieving milestone setup description..",err,"mileStoneDao");
//         callback({"isSuccessful" : false, "error":"Internal Server Error. Please contact System Administrator."});
//       })
//     }
//   else{
//         callback({"isSuccessful" : false, "error":["Milestone not found."]});
//
//   }}.bind(this)).catch(function(err){
//     log.error("Error caught while retrieving milestone config..",err,"mileStoneDao");
//     callback({"isSuccessful" : false, "error":"Internal Server Error. Please contact System Administrator."});
//   })}
//     catch(err)
//     {
//       log.error("Error caught while retrieving milestone ..",err.message,"mileStoneDao");
//       callback({"isSuccessful" : false, "error":"Internal Server Error. Please contact System Administrator."});
//     }
// }


MilestoneDao.prototype.retrieveMileStoneByProductType = function(req, callback){
  try{
      this.db.milestone_configuration.belongsTo(this.db.milestone_setup,{foreignKey : 'milestone_id'})
      this.db.milestone_setup.hasOne(this.db.milestone_configuration,{foreignKey : 'milestone_id'});

  this.db.milestone_configuration.findAll({where:{product_type:req.query.productType,
  product_tier:req.query.productTier,
  transaction_type:req.query.transactionType,
  sales_channel_code: req.query.saleschannelcode,
  status:"A"},
  attributes:['milestone_id','sequence'],raw:true,
  include:[{model:this.db.milestone_setup, attributes:['milestone_description']}]}).then(function(milestone){
    if (milestone && milestone.length !== 0) {
      var tarObj =  milestone.map(element => {
                  return Object.assign({},
                    {
                      mileStoneId : element.milestone_id,
                      sequence : element.sequence,
                      mileStoneDescription: element['milestone_setup.milestone_description']
                    })
      })
        log.info("Milestone found count..."," ","milestoneDao");
        callback({"isSuccessful" : true, "mileStones":tarObj});
    }
  else{
        callback({"isSuccessful" : false, "error":["Milestone not found."]});

  }}.bind(this)).catch(function(err){
    log.error("Error caught while retrieving milestone config for productType: "+req.query.productType+" and productTier: "+req.query.productTier,err,"mileStoneDao");
    callback({"isSuccessful" : false, "error":"Internal Server Error. Please contact System Administrator."});
  })}
    catch(err)
    {
      log.error("Error caught while retrieving milestone for productType: "+req.query.productType+" and productTier: "+req.query.productTier,err.message,"mileStoneDao");
      callback({"isSuccessful" : false, "error":"Internal Server Error. Please contact System Administrator."});
    }
}



/**
  Method to update fullfilment_status for Suspend
  **params**
  itemid : product instance id of the product to update
  callback : response to send back
**/
MilestoneDao.prototype.insertMilestone= function(req,callback) {

  saveMilestone.call(this,req,function(data){
      log.info('data status value ::',data.status,'mileStoneDao');
  if(data.status === "SUCCESS"){
      log.info('reading data inside success ::',data.status,'mileStoneDao');
      this.handleSuccess(data, callback)
  }
  else{
    this.handleError(data, callback)
  }
}.bind(this));
}

/**
  Method to update Product MileStone
**/
MilestoneDao.prototype.updateMilestone= function(req,callback) {

  saveMilestone.call(this,req,function(data){
      log.info('data status value ::',data.status,'mileStoneDao');
  if(data.status === "SUCCESS"){
      log.info('reading data inside success ::',data.status,'mileStoneDao');
      this.handleSuccess(data, callback)
  }
  else{
    this.handleError(data, callback)
  }
}.bind(this));
}

/**
  Method to save product milestone
**/
var saveMilestone = function(req,callback) {
  try{
     var errors = [];
     var model = this.db['milestone_details'];
     log.info('request object length :::',req.body.Content.length,'mileStoneDao');
     var promiseObj = [];
     for (var i = 0; i < req.body.Content.length; i++) {
      var promise = model.build({
            product_instance_id: req.body.Content[i].ProductInstanceId,
            product_descr: req.body.Content[i].ProductDescription,
            milestone_id: req.body.Content[i].mileStoneId,
            sequence_number: req.body.Content[i].sequenceNumber,
            milestone_description: req.body.Content[i].mileStoneDescription,
            transaction_type: req.body.Content[i].transactoinTypes,
            status: req.body.Content[i].status,
            milestone_type: req.body.Content[i].mileStoneType,
            added_by: req.body.Content[i].addedBy,
            added_date: new Date(),
            updated_by: req.body.Content[i].updatedBy,
            updated_date: new Date()
        }).save();
        promiseObj.push(promise);
     }
     Promise.all(promiseObj).then(function(){
         log.info('milestone saved successfully','','mileStoneDao');
         callback({"status" : "SUCCESS" , "data" : "Milestone Insertion/Update Successfull"
         });
     }).catch(function(error){
         errors.push(error.message);
         log.error('Handling Error in milestone Insertion ',error,'mileStoneDao');
         callback(errMsg);
     })
   }
   catch(ex){
     errors.push(ex.message);
     log.error('Handling Eror in milestone Insertion',ex.message,'mileStoneDao');
     callback(errMsg);
   }
};
