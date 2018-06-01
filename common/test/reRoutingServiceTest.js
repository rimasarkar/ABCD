'use strict'
var chai = require('chai');
let chaiHttp = require('chai-http');
require("../src/passport").enableAuthentication = false;
var app = require('../src/app');

chai.should();
chai.use(chaiHttp);

var todayDate = new Date();
todayDate.setDate(todayDate.getDate() + 2); // for future date condition to be true
var month = (todayDate.getMonth()+1).toString();
month = month.length > 1 ? month : '0' + month;
var day = todayDate.getDate().toString();
day = day.length > 1 ? day : '0' + day;
var futureRequestedDate = todayDate.getFullYear()+'-'+month+'-'+day

let request = {
'AuthData': {
  'apiSource': 'CA'
},
'ProductHeader': {
  'enterpriseAccountId': 'BBCJ6656',
  'enterpriseItemId': 'BACD54575S232',
  'businessLocationId': '2063677246',
  'salesChannelCode': 'Local',
  'futureRequestedDate': futureRequestedDate ,
  'transactionType': 'upgrade',
  'productType': 'SEO',
  'productTier': 'STANDARD',
  'userId': 'babus01'
},
'products': [
  {
    'FirstName': 'babu232',
    'LastName': 'Su232',
    'Phone': '0123456789',
    'EmailID': 'ddennis@eastcoastfire.net',
    'BusinessName': 'East Coast Fire & Ventilation',
    'PrimaryCity': 'West Wareham',
    'confirmationNumber': '12345',
    'proposalId': '67656',
    'notes': 'test',
    'WebsiteUrlList': [
      {
        'url': 'www.eastcoastfire.net',
        'isDexmediaSite': 'N',
        'isPrimary': 'Y',
        'isNew': 'Y',
        'username': 'babus01',
        'password': 'babus01'
      }
    ],
    'CategoryList': [
      {
        'CategoryId': '523477',
        'CategoryName': 'Fire Protection Consultants'
      }
    ],
    'PrimaryCatId': {
      'CategoryId': '517824',
      'CategoryName': 'Fire Extinguishers'
      }
    }
  ]
}

 describe('Rerouting Get :', function () {
    it('it should reroute all Get requests based on product type and prodct id', function (done) {
      chai.request(app)
        .get('/common/product/enterpriseItemId/BBDFW03713')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .end(function (err, res) {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
  })

describe('reroute post requests for each product', () => {
    it("it should reroute product request to downstream REST request handler for that product", (done) => {
        chai.request(app)
        .post('/common/post/product')
        .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
        .send(request)
        .end((err, res) => {

          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('isSuccessful')
          done()
        })
      })
  })

describe('reroute put update requests for each product', () => {
      it("it should reroute all put requests based on product type coming in request payload", (done) => {
          chai.request(app)
          .put('/common/put/product')
          .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
          .send(request)
          .end((err, res) => {

            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('isSuccessful')
            done()
          })
        })
    })

describe('reroute put suspend requests for each product', () => {
          it("it should reroute all put suspend requests based on product type in request url", (done) => {
              chai.request(app)
              .put('/common/put/enterpriseItemId/BBDFW03713/suspend')
              .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
              .send(request)
              .end((err, res) => {

                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('isSuccessful')
                done()
              })
            })
        })


describe('reroute put cancel requests for each product', () => {
          it("it should reroute all put cancel requests based on product type in request url", (done) => {
              chai.request(app)
              .put('/common/put/enterpriseItemId/BBDFW03715/cancel')
              .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
              .send(request)
              .end((err, res) => {

                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('isSuccessful')
                done()
              })
            })
        })


  describe('reroute put resume requests for each product', () => {
                it("it should reroute all put resume requests based on product type in request url", (done) => {
                    chai.request(app)
                    .put('/common/put/enterpriseItemId/BBDFW03714/resume')
                    .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
                    .end((err, res) => {
                      res.should.have.status(200)
                      res.body.should.be.a('object')
                      res.body.should.have.property('isSuccessful')
                      done()
                    })
            })
         })


  /*Negative test case for transaction not allowed*/
  describe('Invalid Transaction', () => {
                it("it should not reroute the request as resume transaction is not allowed for SEO LEGACY product", (done) => {
                    chai.request(app)
                    .put('/common/put/enterpriseItemId/BBCHIJK1/resume')
                    .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
                    .end((err, res) => {
                      res.should.have.status(200)
                      res.body.should.be.a('object')
                      res.body.should.have.property('isSuccessful')
                      done()
                    })
            })
         })


   /*Negative test case for transaction not allowed as itemid exists in product_to_process_errors or billing_sfdc_errors table*/
  describe('Invalid Transaction', () => {
                       it("it should not reroute the request as itemid exists in product_to_process_errors or billing_sfdc_errors table", (done) => {
                           chai.request(app)
                           .put('/common/put/enterpriseItemId/BBDFW03713/resume')
                           .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
                           .end((err, res) => {
                             res.should.have.status(200)
                             res.body.should.be.a('object')
                             res.body.should.have.property('isSuccessful')
                             done()
                           })
                   })
                })


require("../src/passport").enableAuthentication = true;
