'use strict'

var chai = require('chai');
let chaiHttp = require('chai-http');
require("../src/passport").enableAuthentication = false;
var app = require('../src/app');

chai.should();
chai.use(chaiHttp);

/**
 * It should run test case for Updating status in process Milestones
 *
 */
describe('/Update processmilestones', () => {
    it('it should Put milestone details', (done) => {
        let request = {
            "parentProcessId": "7899",
            "childProcessId": "7899",
            "mileStoneId": "12",
            "Status": "Error"

        }
        chai.request(app)
            .put('/common/put/processmilestone')
            .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

/**
  *Test case to get the process milestones details for the given enterprise item id
  * */
 describe('process milestones details Get :', function () {
    it('it should Get Milestones details for the given process Id', function (done) {
      chai.request(app)
        .get('/common/retrieveprocessmilestones/productInstanceId/2508')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .end(function (err, res) {
          res.should.have.status(200)
          res.should.be.json;
          res.body.should.be.a('object')
          done()
        })
    })
  })
require("../src/passport").enableAuthentication = false;
