'use strict'

var chai = require('chai');
let chaiHttp = require('chai-http');
require("../src/passport").enableAuthentication = false;
var app = require('../src/app');

chai.should();
chai.use(chaiHttp);


  /*
  * It should run test case for Inserting Milestones
  */
  describe('/POST Milestones', () => {

      it('it should Post', (done) => {
         let request =           {
                        "Content": [
                            {
                            "ProductInstanceId": "1149",
                            "ProductDescription": "Product Description",
                            "mileStoneId": "01245",
                            "sequenceNumber" : "3205",
                            "mileStoneDescription" : "Mile Stone Description",
                            "transactoinTypes":"NEW",
                            "status": "Y",
                            "mileStoneType":"NEW",
                            "addedBy" : "babus01",
                            "updatedBy": "babus01"
                            },
                            {
                            "ProductInstanceId": "1150",
                            "ProductDescription": "Product Description",
                            "mileStoneId": "01245",
                            "sequenceNumber" : "3205",
                            "mileStoneDescription" : "Mile Stone Description",
                            "transactoinTypes":"NEW",
                            "status": "Y",
                            "mileStoneType":"NEW",
                            "addedBy" : "babus01",
                            "updatedBy": "babus01"
                            }

                                ]

                    }
        chai.request(app)
            .post('/common/post/mileStone')
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
 * It should run test case for Updating Milestones
 *
 */
 describe('/Update Milestones', () => {

      it('it should Put', (done) => {
         let request =           {
                        "Content": [
                            {
                            "ProductInstanceId": "1149",
                            "ProductDescription": "Product Description",
                            "mileStoneId": "01245",
                            "sequenceNumber" : "3205",
                            "mileStoneDescription" : "Mile Stone Description",
                            "transactoinTypes":"NEW",
                            "status": "Y",
                            "mileStoneType":"NEW",
                            "addedBy" : "babus01",
                            "updatedBy": "babus01"
                            },
                            {
                            "ProductInstanceId": "1150",
                            "ProductDescription": "Product Description",
                            "mileStoneId": "01245",
                            "sequenceNumber" : "3205",
                            "mileStoneDescription" : "Mile Stone Description",
                            "transactoinTypes":"NEW",
                            "status": "Y",
                            "mileStoneType":"NEW",
                            "addedBy" : "babus01",
                            "updatedBy": "babus01"
                            }

                                ]

                    }
        chai.request(app)
            .put('/common/put/mileStone')
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
   * It should run test case for retrieving Milestones based on product type, product tier and transaction type
   *
   */
   describe('/retrieve Milestones', () => {

        it('it should get milestones', (done) => {
           let queryString = "productType=SEO&productTier=PREMIUM&transactionType=NEW"

          chai.request(app)
              .get('/common/retrieveMilestoneByProductType?'+queryString)
              .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  done();
                  });
        });
    });

    require("../src/passport").enableAuthentication = true;
