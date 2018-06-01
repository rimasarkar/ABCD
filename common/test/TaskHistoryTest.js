'use strict'
var chai = require('chai');
let chaiHttp = require('chai-http');
require("../src/passport").enableAuthentication = false;
var app = require('../src/app');

chai.should();
chai.use(chaiHttp);

let payLoad = {
"taskHistoryHeader":{
"productInstanceId":"2454",
"parentProcessId":"536881360",
"mileStoneId":"1"
},
"taskHistory":[
{
"taskId":"54321",
"taskDescription":"Test Task",
"status":"Completed",
"user":"babus01",
"dateTimeStamp":"2017-11-21",
"taskHistoryDetails":[{
"resultName":"Website Live",
"resultValue":"No"
},
{
"resultName":"DexHub Website",
"resultValue":"Yes"
}]
},
{
"taskId":"12345",
"taskDescription":"Test Task1",
"status":"In progress",
"user":"babus01",
"dateTimeStamp":"2017-11-21",
"taskHistoryDetails":[{
"resultName":"Website takeoff",
"resultValue":"No"
},
{
"resultName":"DexHub Website takeoff",
"resultValue":"Yes"
}]
}
]
};

/*Test case to get the product instance details for the given enterprise item id  */
 describe('Task History Get :', function () {
    it('it should Get Instance Notes details for the given process Instance Id', function (done) {
      chai.request(app)
        .get('/common/retrievetaskhistory/productInstanceId/2454')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .end(function (err, res) {
          res.should.have.status(200)
          res.should.be.json;
          res.body.should.be.a('object')
          done()
        })
    })
  })


  /*Test case to verify the insertion of product instance notes*/
describe('Task History insertion', () => {
    it("it should insert the given data as a request", (done) => {
        chai.request(app)
        .post('/common/post/taskHistory')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .send(payLoad)
        .end((err, res) => {
          //res.should.be.json;
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
      })
  })
require("../src/passport").enableAuthentication = true;
