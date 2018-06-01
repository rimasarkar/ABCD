'use strict'

var chai = require('chai');
let chaiHttp = require('chai-http');
require("../src/passport").enableAuthentication = false;
var app = require('../src/app');

chai.should();
chai.use(chaiHttp);

let payLoad = {
'productInstanceId' : '2508',
'notes'  :            'test case notes',
'addedOn':            '2017-11-21',
'addedBy':            'babus01'
}

let request = {
'notes'  :            'test case notes',
'addedOn':            '2017-11-21',
'addedBy':            'babus01'
}

/*Test case to get the product instance details for the given enterprise item id  */
 describe('Instance Notes Get :', function () {
    it('it should Get Instance Notes details for the given process Instance Id', function (done) {
      chai.request(app)
        .get('/common/retrievenotes/productInstanceId/2508')
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
describe('Instance notes insertion', () => {
    it("it should insert the given data as a request", (done) => {
        chai.request(app)
        .post('/common/post/instanceNotes')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .send(payLoad)
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('isSuccessful')
          res.body.should.have.property('isSuccessful',true)
          done()
        })
      })
  })

  /*Negative test case for insertion of data with in proper request */
describe('Instance notes insertion with improper request', () => {
    it("it should throw an erro wtih 'Internal Server Error. Please Contact System Administrator.'", (done) => {
        chai.request(app)
        .post('/common/post/instanceNotes')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .send(request)
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.should.have.property('isSuccessful')
          res.body.should.have.property('isSuccessful',false)
          res.body.error.should.be.a('string')
          res.body.isSuccessful.should.equal(false)
          res.body.isSuccessful.should.be.a('boolean')
          done()
        })
      })
  })
  require("../src/passport").enableAuthentication = true;
