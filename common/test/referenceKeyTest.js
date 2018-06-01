var chai = require("chai");
let chaiHttp = require("chai-http");
var db = require("../src/models");
if (process.env.NODE_ENV && process.env.NODE_ENV !== "SQLITE_TEST")
  require("../src/passport").enableAuthentication = false;
var app = require("../src/app");
chai.should();
chai.use(chaiHttp);

describe("get reference ids.. ", function() {
  /* before(function() {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "SQLITE_TEST") {
      var objArr = [];
      var recordCount = 2;
      return db.reference_key_table
        .sync({ force: true })
        .then((err, data) => {
          return Promise.resolve("table created successfully..");
        })
        .then(tableCreated => {
          console.log(tableCreated);
          console.log("Inserting " + recordCount + " records...");
          for (var i = 1; i <= recordCount; i++)
            objArr.push({ object_id: "EAID" + i, object_type: "EAID",reference_id: i,attribute_1: null,
            attribute_2: null,
            attribute_3: null,
            attribute_4: null,
            attribute_5: null,added_by: "SQLITE_TEST",added_date:new Date(),updated_by: "SQLITE_TEST",updated_date:new Date() });

          return db.reference_key_table.bulkCreate(objArr);
        })
        .then(result => {
          console.log("entries added successfully..");
        })
        .catch(err => console.log("Error caught while creating table.." + err));
    }
  });*/

  it("it should return reference ids.. :::", function(done) {
    let request = {
      referenceObject: [
        {
          objectType: "EAID",
          objectId: "Account513"
        },
        {
          objectType: "EAID",
          objectId: "BBCJ6656"
        }
      ]
    };
    chai
      .request(app)
      .post("/common/get/referenceid")
      .set("authorization", "Basic RVNCOkJkTDVDMzVqd05DMks2VnM=")
      .send(request)
      .end(function(err, res) {
        res.should.have.status(200);
        // res.body.should.be.a("object");
        res.body.should.have.property("referenceObject");
        done();
      });
  });
});
