'use strict'
var chai = require('chai');
let chaiHttp = require('chai-http');
var app = require('../src/app');

chai.should();
chai.use(chaiHttp);

let payLoad = {  
   "sourceAccount":"abbccdd",
   "targetAccount":"ddccbba"
};


  /*Test case to verify the insertion of product instance notes*/
describe('ASDS Merge', () => {
    it("it should Merge the souce Acocunt with Target Account ", (done) => {
        chai.request(app)
        .post('/common/post/AccountMerge')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .send(payLoad)
        .end((err, res) => {
          res.should.be.json; 
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('isSuccessful')
          //res.body.should.have.property('isSuccessful').eql(true)         
          done()
        })
      })
  })