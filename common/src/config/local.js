'use strict'
module.exports = {
  // Server port
  port: process.env.port || 3000,
  // mysql connections
  mysql: {
    database: 'titand',
    dialect: 'mysql',
    replication: {
      read: [{
        host: 'titand.dexmedia.com',
        username: 'titand',
        password: 'ABtT1MbgmKZpjA31ljcS7HtQ',
        port: 23306, 
        pool: {
          max: 5,
          min: 0,
          idle: 50
        }
      }],
      write: {
        host: 'titand.dexmedia.com',
        username: 'titand',
        password: 'ABtT1MbgmKZpjA31ljcS7HtQ',
        port: 23306, 
        pool: {
          max: 5,
          min: 0,
          idle: 50
        }
      }
    },
    pool: {
      max: 5,
      min: 0,
      idle: 50
    }
  },
 "products" :{
  "SEO-POST":"https://localhost:3000/seo/post/seoproduct/",
  "SEO-GET" : "https://localhost:3000/seo/get/seoproduct/enterpriseItemId/%s",
  "SEO-GET-PID" : "https://localhost:3000/seo/get/seoproduct/productinstanceid/%s",
  "SEO-PUT" : "https://localhost:3000/seo/put/seoproduct/",
  "SEO-PUT-SUSPEND":"https://localhost:3000/seo/put/seoproduct/enterpriseItemId/%s/suspend",
  "SEO-PUT-CANCEL":"https://localhost:3000/seo/put/seoproduct/enterpriseItemId/%s/cancel",
  "SEO-PUT-RESUME":"https://localhost:3000/seo/put/seoproduct/enterpriseItemId/%s/resume",
  "OLM-POST":"https://localhost:3000/olm/post/olmproduct/",
  "OLM-GET" : "https://localhost:3000/olm/get/olmproduct/enterpriseItemId/%s",
  "OLM-GET-PID" : "https://localhost:3000/olm/get/olmproduct/productinstanceid/%s",
  "OLM-PUT" : "https://localhost:3000/olm/put/olmproduct/",
  "OLM-PUT-SUSPEND":"https://localhost:3000/olm/put/olmproduct/enterpriseItemId/%s/suspend",
  "OLM-PUT-CANCEL":"https://localhost:3000/olm/put/olmproduct/enterpriseItemId/%s/cancel",
  "OLM-PUT-RESUME":"https://localhost:3000/olm/put/olmproduct/enterpriseItemId/%s/resume",
  "GPL-POST":"https://localhost:3000/gpl/post/gplproduct/",
  "GPL-GET" : "https://localhost:3000/gpl/get/gplproduct/enterpriseItemId/%s",
  "GPL-PUT" : "https://localhost:3000/gpl/put/gplproduct/",
  "GPL-PUT-SUSPEND":"https://localhost:3000/gpl/put/gplroduct/enterpriseItemId/%s/suspend",
  "GPL-PUT-CANCEL":"https://localhost:3000/gpl/put/gplproduct/enterpriseItemId/%s/cancel",
  "GPL-PUT-RESUME":"https://localhost:3000/gpl/put/gplproduct/enterpriseItemId/%s/resume"
 },
  esb: 'https://esb-dev.dexmedia.com/enterprise/v3/update?idtype=eiid&action=updateitem',
  esb_sf: 'http://esb-dev-int.dexmedia.com/enterprise/v1/fulfillment/item',
  salesfoforce: 'some salesforce url',
  esbuserid: process.env.esbuserid || 'esbtitant',
  esbpassword: process.env.esbpassword || '06TEB6ATI$!',
  sourceSystem: 'TITAN'
}
