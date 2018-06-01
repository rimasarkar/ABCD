'use strict'
var chai = require('chai');
let chaiHttp = require('chai-http');
require("../src/passport").enableAuthentication = false;
var app = require('../src/app');
chai.should();
chai.use(chaiHttp);




/*
* Test the product instance route
*/
describe('product status :NEW Transaction :::--', function () {
  it('it should update the intance status and fulfilment status based on transaction type for prodct instance id', function (done) {
    chai.request(app)
      .put('/common/put/updatestatus/1055/NEW/pendingnewwf/false/fulfilmentdate/2018-01-17')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful')
        res.body.should.have.property('isSuccessful').eql(true)
        done()
      })
  })
})

describe('product status : RESUME Transaction :::--', function () {
  it('it should update the intance status and fulfilment status based on transaction type for prodct instance id', function (done) {
    chai.request(app)
      .put('/common/put/updatestatus/1055/RESUME/pendingnewwf/false/fulfilmentdate/2018-01-17')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful')
        res.body.should.have.property('isSuccessful').eql(true)
        done()
      })
  })
})

describe('product status :SUSPEND Transaction :::-- ', function () {
  it('it should update the intance status and fulfilment status based on transaction type for prodct instance id', function (done) {
    chai.request(app)
      .put('/common/put/updatestatus/1055/SUSPEND/pendingnewwf/false/fulfilmentdate/2018-01-17')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful')
        res.body.should.have.property('isSuccessful').eql(true)
        done()
      })
  })
})

describe('product status : CANCEL Transaction :::-- ', function () {
  it('it should update the intance status and fulfilment status based on transaction type for prodct instance id', function (done) {
    chai.request(app)
      .put('/common/put/updatestatus/1055/CANCEL/pendingnewwf/false/fulfilmentdate/2018-01-17')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful')
        res.body.should.have.property('isSuccessful').eql(true)
        done()
      })
  })
})

/* describe('product data conversion ::::', function () {
  it('it should update the intance status based on CANCELConv type for enterpriseItemId :::', function (done) {
    chai.request(app)
      .put('/common/put/enterpriseItemId/BACD54575S4/cancelConv')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful')
        res.body.should.have.property('isSuccessful').eql(true)
        done()
      })
  })
}) */

describe('update product instance with parent process id and insert process milestone.. ', function () {
  it('it should update the product instance parent process id and insert process milestone :::', function (done) {
    let request = {
      "productType": "SEO",
      "productTier": "STANDARD",
      "transactionType": "OLD",
      "parentProcessId": "1111",
      "productInstanceId": "1034",
      "workflowRestarted": "N",
      "childProcessId": "111"
    }
    chai.request(app)
      .put('/common/put/processInstance')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful')
        done()
      })
  })
})

describe('get all item ids.. ', function () {
  it('it should return all item ids.. :::', function (done) {
    chai.request(app)
      .get('/common/get/allitemids')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful')
        done()
      })
  })
})

describe('update billing trigger date for corresponding product instance id .. ', function () {
  it('it should update billing trigger date for item id.. :::', function (done) {
    chai.request(app)
      .put('/common/product/updatebilldate/productinstanceid/danish/date/2018-01-17')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful', false);
        done()
      })
  })
})

describe('update billing trigger date for corresponding product instance id .. ', function () {
  it('it should throw invalid date exception for passed billing trigger date.. :::', function (done) {
    chai.request(app)
      .put('/common/product/updatebilldate/productinstanceid/danish/date/218-01-17')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful', 'false');
        res.body.should.have.property('error');
        done()
      })
  })
})


/*Test case to get the product instance details for the given enterprise item id  */
describe('Product Instance Get :', function () {
  it('it should Get the product instance details for the given enterprise item id', function (done) {
    chai.request(app)
      .get('/common/product/instanceheaderdata/enterpriseItemId/OLMDEV2')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('object')
        //console.log(res)
        res.body.should.have.property("ContentHistoryFlag")
        //res.body.should.have.property('ContentHistoryFlag').eql(true) 
        //res.body.ContentHistoryFlag.should.equal('true');
        // res.body.should.have.property('ContentHistoryFlag','true'); 
        done()
      })
  })
})
require("../src/passport").enableAuthentication = true;
