'use strict'
module.exports = {
  // Server port
  port: process.env.port || 3000,
 "products" :{
    "SEO-POST":"https://titand-seo.a01.dexmedia.com:3000/seo/post/seoproduct/",
    "SEO-GET" : "https://titand-seo.a01.dexmedia.com:3000/seo/get/seoproduct/enterpriseItemId/%s",
    "SEO-GET-PID" : "https://titand-seo.a01.dexmedia.com:3000/seo/get/seoproduct/productinstanceid/%s",
    "SEO-PUT" : "https://titand-seo.a01.dexmedia.com:3000/seo/put/seoproduct/",
    "SEO-PUT-SUSPEND":"https://titand-seo.a01.dexmedia.com:3000/seo/put/seoproduct/enterpriseItemId/%s/suspend",
    "SEO-PUT-CANCEL":"https://titand-seo.a01.dexmedia.com:3000/seo/put/seoproduct/enterpriseItemId/%s/cancel",
    "SEO-PUT-RESUME":"https://titand-seo.a01.dexmedia.com:3000/seo/put/seoproduct/enterpriseItemId/%s/resume",
    "OLM-POST":"https://titand-olm.a01.dexmedia.com:3000/olm/post/olmproduct/",
    "OLM-GET" : "https://titand-olm.a01.dexmedia.com:3000/olm/get/olmproduct/enterpriseItemId/%s",
    "OLM-GET-PID" : "https://titand-olm.a01.dexmedia.com:3000/olm/get/olmproduct/productinstanceid/%s",
    "OLM-PUT" : "https://titand-olm.a01.dexmedia.com:3000/olm/put/olmproduct/",
    "OLM-PUT-SUSPEND":"https://titand-olm.a01.dexmedia.com:3000/olm/put/olmproduct/enterpriseItemId/%s/suspend",
    "OLM-PUT-CANCEL":"https://titand-olm.a01.dexmedia.com:3000/olm/put/olmproduct/enterpriseItemId/%s/cancel",
    "OLM-PUT-RESUME":"https://titand-olm.a01.dexmedia.com:3000/olm/put/olmproduct/enterpriseItemId/%s/resume",
    "GPL-POST":"https://titand-gpl.a01.dexmedia.com:3000/gpl/post/gplproduct/",
    "GPL-GET" : "https://titand-gpl.a01.dexmedia.com:3000/gpl/get/gplproduct/enterpriseItemId/%s",
    "GPL-PUT" : "https://titand-gpl.a01.dexmedia.com:3000/gpl/put/gplproduct/",
    "GPL-PUT-SUSPEND":"https://titand-gpl.a01.dexmedia.com:3000/gpl/put/gplroduct/enterpriseItemId/%s/suspend",
    "GPL-PUT-CANCEL":"https://titand-gpl.a01.dexmedia.com:3000/gpl/put/gplproduct/enterpriseItemId/%s/cancel",
    "GPL-PUT-RESUME":"https://titand-gpl.a01.dexmedia.com:3000/gpl/put/gplproduct/enterpriseItemId/%s/resume"
 },
 esb: 'https://esb-dev.dexmedia.com/enterprise/v3/update?idtype=eiid&action=updateitem',
 esb_sf: 'http://esb-dev.dexmedia.com/enterprise/v1/fulfillment/item',
  salesfoforce: 'some salesforce url1',
  esbuserid: process.env.esbuserid || 'esbtitant',
  esbpassword: process.env.esbpassword || '06TEB6ATI$!',
  sourceSystem: 'TITAN'
}
