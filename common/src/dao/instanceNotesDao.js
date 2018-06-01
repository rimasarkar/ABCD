'use strict'
var log = require('../logger');
var errMsg = "Internal Server Error. Please Contact System Administrator."
var InstanceNotesDao = module.exports = function(model) {
  this.instanceNotesModel = model;
}

InstanceNotesDao.prototype.handleError = function(msg, callback) {
  callback({
    isSuccessful:  false,
    error: msg
  })
}

InstanceNotesDao.prototype.handleSuccess = function(data, callback) {
  callback({
    isSuccessful:  true
  })
}

InstanceNotesDao.prototype.insertInstanceNotes = function (req, callback) {
    getInstanceSequence.call(this, req.body.productInstanceId)
        .then(seq => {
          log.info('sequence number received : ',seq)
            saveInstanceNotes.call(this, req, seq,  function (data) {
                if (data.status === "SUCCESS")
                    this.handleSuccess(data, callback)
                else
                    this.handleError(data, callback)
            }.bind(this));
        }).catch(function (error) {
            log.error('Handling error in instanceNotes insertion for instanceId: '+req.body.productInstanceId, error, 'instanceNotesDao');
            this.handleError("Error in Retriving sequence number ", callback)
        })
};

InstanceNotesDao.prototype.getInstanceNotes = function (req, model, callback) {
  checkInstanceId.call(this, model, req)
        .then(data => {
          log.info('enterprise id for the given product instance id :', req.params.id, ' is ',JSON.parse(JSON.stringify(data[0])).itemId)
          if (data.length != 0) {
            getNotesDetailsById.call(this, req.params.id)
              .then(data => {
                callback({ notes: data })
              }).catch(function (error) {
                callback({ isSuccessful: false, error: error })
              })
          } else {
                callback({ isSuccessful: false, error: 'No Data found for the given Instance Id ' })
        }
        }).catch(function (error) {
           log.error('Handling error in instanceNotes get for instanceId: '+req.params.id, error, 'instanceNotesDao');
           callback({isSuccessful:  false,error: error})
        })
}

/**
  Method to save product Instance Notes
**/
var saveInstanceNotes = function(req, seq,  callback) {
  log.info('sequence number inserting for the record is : '+seq)
  try{
     var model = this.instanceNotesModel;
     var promiseObj = [];
       var promise = model.build({
            product_instance_id: req.body.productInstanceId,
            sequence: seq,
            notes: req.body.notes,
            added_by: req.body.addedBy,
            added_date: req.body.addedOn,
            updated_by: req.body.addedBy,
            updated_date: new Date()
        }).save();
        promiseObj.push(promise);

     Promise.all(promiseObj).then(function(){
         callback({"status" : "SUCCESS" , "data" : "instanceNotes Insertion/Update Successfull"
         });
     }).catch(function(error){
         log.error('Handling Eror in instanceNotes Insertion for instanceId: '+ req.body.productInstanceId,error,'instanceNotesDao');
         callback(errMsg);
     })
   }
   catch(ex){
     log.error('Handling Eror in instanceNotes Insertion for instanceId: '+ req.body.productInstanceId,ex.message,'instanceNotesDao');
     callback(errMsg);
   }
};


var checkInstanceId = function (model,req) {
 return new Promise((resolve, reject) => {
    try {
      model.findAll({
        where: {product_instance_id : req.params.id },
         attributes: [
            ['enterprise_item_id', 'itemId']
        ] 
      }).then(function (data) {
        if (data.length != 0)
          return resolve(data)
          else
          return reject('No details found for the given Instance Id ')
      }).catch(function (error) {
        log.error('instanceNotes get  failed for instanceId: '+req.params.id, error,  'instanceNotesDao')
        return reject(error)
      })
    } catch (ex) {
      log.error('Exception occurred while retrieving the content in getInstanceNotesDetails for instanceId: '+req.params.id )
      return reject(ex)
    }
  })
}


var getInstanceSequence = function (productInstanceId) {
    var model = this.instanceNotesModel;
    return new Promise((resolve, reject) => {
        model.max('sequence', { where: { product_instance_id: productInstanceId } }).then(seq => {
          console.log("maximum number : "+seq)
            if(isNaN(parseFloat(seq)))
             return resolve('1')
             else
            return resolve(++seq)
        }).catch(function (error) {
            log.error('Handling Error in instanceNotes Insertion for instanceId: '+productInstanceId, error, 'instanceNotesDao');
            return reject('1')
        })
    });
}


var getNotesDetailsById = function (productInstanceId) {
  var model = this.instanceNotesModel;
 return new Promise((resolve, reject) => {
    try {
      model.findAll({
        where: {product_instance_id : productInstanceId },
         attributes: [
            ['sequence', 'sequence'],
            ['notes', 'notes'],
            ['added_date', 'addedOn'],
            ['added_by', 'addedBy']
        ]
      }).then(function (data) {
        if (data.length != 0)
          return resolve(data)
          else
          return reject('No details found for the given Product Instance Id : ')
      }).catch(function (error) {
        log.error('instanceNotes get failed for instanceId: '+productInstanceId ,error,  'instanceNotesDao')
        return reject(error)
      })
    } catch (ex) {
      log.error('Exception occurred while retrieving the content in getInstanceNotesDetails for instanceId: '+productInstanceId )
      return reject(ex)
    }
  })
}
