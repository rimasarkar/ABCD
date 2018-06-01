'use strict'

var chai = require('chai');
let chaiHttp = require('chai-http');
require("../src/passport").enableAuthentication = false;
var app = require('../src/app');
chai.should();
chai.use(chaiHttp);


  /*
  * It should run test case for Inserting task / Process History
  */
  describe('/POST Process History', () => {

      it('it should Post', (done) => {
         let request =           {

                    "productInstanceId" : 1070,
                    "productDescr" : "SEO description",
                    "taskId" : "TSK001",
                    "taskDescription": "sec task desc",
                    "transactionType" : "NEW",
                    "completedBy" : "Vishng01",
                    "completedTime" : "0000-00-00",
                    "orderReceivedStartTime" : "0000-00-00",
                    "manualAssignCompleteTime" : "0000-00-00",
                    "disposition" :"na",
                    "outcome" : "na",
                    "attendees" : "10",
                    "reason" : "Record update reason",
                    "taskType" : "Sample",
                    "slaTime" : "0000-00-00",
                    "addedBy" : "vishng01",
                    "addedDate" : "0000-00-00",
                    "updatedBy" : "vishng01",
                    "updatedDate" : "0000-00-00"
                }

        chai.request(app)
            .post('/common/post/processhistory')
            .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
                });
      });
  });

  require("../src/passport").enableAuthentication = true;
