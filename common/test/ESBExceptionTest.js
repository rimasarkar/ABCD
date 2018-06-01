'use strict'

var chai = require('chai');
let chaiHttp = require('chai-http');
require("../src/passport").enableAuthentication = false;
var app = require('../src/app');

chai.should();
chai.use(chaiHttp);

let request = {

}
  /*
  * Test the ESBException instance..
  */
  describe('ESB Exception Success for failed Appian Call:', function () {
    this.timeout(25000);
    before(function(){
      request.productInstanceId = "1034";
      request.url="https://testurl/seoOrder";
      request.jsonObj = "{itemid:’1034-Test’}";
      request.errorDescription = "Test WF creation failed";
      console.log(request);
    })
    after(function(){
      delete request.productInstanceId;
      delete request.errorDescription;
      delete request.jsonObj;
      delete request.url;;
      console.log(request);
    })
    it('it should insert the exception data in process_errors table', function (done) {
      chai.request(app)
        .post('/common/post/ESBAppianException')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .send(request)
        .end(function (err, res) {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('isSuccessful')
          res.body.should.have.property('isSuccessful')
          done()
        })
    })
  })

  describe('ESB Exception failure for failed Appian Call:', function () {
    this.timeout(25000);
    it('it should throw exception with invalid input data for failed Appian Call', function (done) {
      chai.request(app)
        .post('/common/post/ESBAppianException')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .send(request)
        .end(function (err, res) {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('isSuccessful')
          res.body.should.have.property('isSuccessful')
          res.body.should.have.property('error')
          done()
        })
    })
  })

  describe('ESB Exception Success for failed SFDC Call:', function () {
    this.timeout(25000);
    before(function(){
      request.enterpriseItemId = "1011";
      request.url="https://testurl/seoOrder";
      request.jsonObj = "{itemid:’1034-Test’}";
      request.errorDescription = "Test WF creation failed";
      console.log(request);
    })
    after(function(){
      delete request.enterpriseItemId;
      delete request.errorDescription;
      delete request.jsonObj;
      delete request.url;;
      console.log(request);
    })
    it('it should insert the exception data in billing_sfdc_errors table', function (done) {
      chai.request(app)
        .post('/common/post/ESBSfdcException')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .send(request)
        .end(function (err, res) {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('isSuccessful')
          res.body.should.have.property('isSuccessful')
          done()
        })
    })
  })

  describe('ESB Exception failure for failed SFDC Call:', function () {
    this.timeout(25000);
    it('it should throw exception with invalid input data for failed SFDC call', function (done) {
      chai.request(app)
        .post('/common/post/ESBSfdcException')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .send(request)
        .end(function (err, res) {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('isSuccessful')
          res.body.should.have.property('error')
          done()
        })
    })
  })

  require("../src/passport").enableAuthentication = true;
