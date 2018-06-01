var chai = require('chai');
let chaiHttp = require('chai-http');
var db = require('../src/models');
if(process.env.NODE_ENV && process.env.NODE_ENV !== "SQLITE_TEST" )
  require("../src/passport").enableAuthentication = false;
var app = require('../src/app');
chai.should();
chai.use(chaiHttp);


describe('get all item ids.. ', function () {

before( function(){
if(process.env.NODE_ENV && process.env.NODE_ENV === "SQLITE_TEST" ){
  var objArr = [];
  var recordCount = 500000;
  return  db.product_instance_mem.sync()
    .then((err,data) => { return Promise.resolve("table created successfully..")})
    .then(tableCreated => {
      console.log(tableCreated);
      console.log("Inserting "+ recordCount +" records...");
      for(var i=1; i <= recordCount ; i++)
        objArr.push({product_type:'SEO'+i, product_tier:'PREMIUM'+i,enterprise_item_id:i});

      return db.product_instance_mem.bulkCreate(objArr);
    })
    .then(result => {console.log("entries added successfully..")})
    .catch(err => console.log("Error caught while creating table.." + err));
  }
})

  it('it should return all item ids.. :::', function (done) {
    chai.request(app)
      .get('/common/get/allitemids')
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .end(function (err, res) {
        //console.log(res.text)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('isSuccessful')
        done()
      })
  })
})
