'use strict'
module.exports = {
  // Server port
  port: process.env.port || 3000,
 "products" :{
    "SEO-POST":"https://titanp-seo.a01.dexmedia.com:3000/seo/post/seoproduct/",
    "SEO-GET" : "https://titanp-seo.a01.dexmedia.com:3000/seo/get/seoproduct/enterpriseItemId/%s",
    "SEO-GET-PID" : "https://titanp-seo.a01.dexmedia.com:3000/seo/get/seoproduct/productinstanceid/%s",
    "SEO-PUT" : "https://titanp-seo.a01.dexmedia.com:3000/seo/put/seoproduct/",
    "SEO-PUT-SUSPEND":"https://titanp-seo.a01.dexmedia.com:3000/seo/put/seoproduct/enterpriseItemId/%s/suspend",
    "SEO-PUT-CANCEL":"https://titanp-seo.a01.dexmedia.com:3000/seo/put/seoproduct/enterpriseItemId/%s/cancel",
    "SEO-PUT-RESUME":"https://titanp-seo.a01.dexmedia.com:3000/seo/put/seoproduct/enterpriseItemId/%s/resume",
    "OLM-POST":"https://titanp-olm.a01.dexmedia.com:3000/olm/post/olmproduct/",
    "OLM-GET" : "https://titanp-olm.a01.dexmedia.com:3000/olm/get/olmproduct/enterpriseItemId/%s",
    "OLM-GET-PID" : "https://titanp-olm.a01.dexmedia.com:3000/olm/get/olmproduct/productinstanceid/%s",
    "OLM-PUT" : "https://titanp-olm.a01.dexmedia.com:3000/olm/put/olmproduct/",
    "OLM-PUT-SUSPEND":"https://titanp-olm.a01.dexmedia.com:3000/olm/put/olmproduct/enterpriseItemId/%s/suspend",
    "OLM-PUT-CANCEL":"https://titanp-olm.a01.dexmedia.com:3000/olm/put/olmproduct/enterpriseItemId/%s/cancel",
    "OLM-PUT-RESUME":"https://titanp-olm.a01.dexmedia.com:3000/olm/put/olmproduct/enterpriseItemId/%s/resume",
    "GPL-POST":"https://titanp-gpl.a01.dexmedia.com:3000/gpl/post/gplproduct/",
    "GPL-GET" : "https://titanp-gpl.a01.dexmedia.com:3000/gpl/get/gplproduct/enterpriseItemId/%s",
    "GPL-PUT" : "https://titanp-gpl.a01.dexmedia.com:3000/gpl/put/gplproduct/",
    "GPL-PUT-SUSPEND":"https://titanp-gpl.a01.dexmedia.com:3000/gpl/put/gplroduct/enterpriseItemId/%s/suspend",
    "GPL-PUT-CANCEL":"https://titanp-gpl.a01.dexmedia.com:3000/gpl/put/gplproduct/enterpriseItemId/%s/cancel",
    "GPL-PUT-RESUME":"https://titanp-gpl.a01.dexmedia.com:3000/gpl/put/gplproduct/enterpriseItemId/%s/resume"
 },
 esb: 'https://esb.dexmedia.com/enterprise/v3/update?idtype=eiid&action=updateitem',
 esb_sf: 'http://esb.dexmedia.com/enterprise/v1/fulfillment/item',
  salesfoforce: 'some salesforce url1',
  esbuserid: process.env.esbuserid || 'esbtitan',
  esbpassword: process.env.esbpassword || '10TEB@API$!',
  sourceSystem: 'TITAN'
}