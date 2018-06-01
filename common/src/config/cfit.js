'use strict'
module.exports = {
  // Server port
  port: process.env.port || 3000,
 "products" :{
    "SEO-POST":"https://titanr-seo.a01.dexmedia.com:3000/seo/post/seoproduct/",
    "SEO-GET" : "https://titanr-seo.a01.dexmedia.com:3000/seo/get/seoproduct/enterpriseItemId/%s",
    "SEO-GET-PID" : "https://titanr-seo.a01.dexmedia.com:3000/seo/get/seoproduct/productinstanceid/%s",
    "SEO-PUT" : "https://titanr-seo.a01.dexmedia.com:3000/seo/put/seoproduct/",
    "SEO-PUT-SUSPEND":"https://titanr-seo.a01.dexmedia.com:3000/seo/put/seoproduct/enterpriseItemId/%s/suspend",
    "SEO-PUT-CANCEL":"https://titanr-seo.a01.dexmedia.com:3000/seo/put/seoproduct/enterpriseItemId/%s/cancel",
    "SEO-PUT-RESUME":"https://titanr-seo.a01.dexmedia.com:3000/seo/put/seoproduct/enterpriseItemId/%s/resume",
    "OLM-POST":"https://titanr-olm.a01.dexmedia.com:3000/olm/post/olmproduct/",
    "OLM-GET" : "https://titanr-olm.a01.dexmedia.com:3000/olm/get/olmproduct/enterpriseItemId/%s",
    "OLM-GET-PID" : "https://titanr-olm.a01.dexmedia.com:3000/olm/get/olmproduct/productinstanceid/%s",
    "OLM-PUT" : "https://titanr-olm.a01.dexmedia.com:3000/olm/put/olmproduct/",
    "OLM-PUT-SUSPEND":"https://titanr-olm.a01.dexmedia.com:3000/olm/put/olmproduct/enterpriseItemId/%s/suspend",
    "OLM-PUT-CANCEL":"https://titanr-olm.a01.dexmedia.com:3000/olm/put/olmproduct/enterpriseItemId/%s/cancel",
    "OLM-PUT-RESUME":"https://titanr-olm.a01.dexmedia.com:3000/olm/put/olmproduct/enterpriseItemId/%s/resume",
    "GPL-POST":"https://titanr-gpl.a01.dexmedia.com:3000/gpl/post/gplproduct/",
    "GPL-GET" : "https://titanr-gpl.a01.dexmedia.com:3000/gpl/get/gplproduct/enterpriseItemId/%s",
    "GPL-PUT" : "https://titanr-gpl.a01.dexmedia.com:3000/gpl/put/gplproduct/",
    "GPL-PUT-SUSPEND":"https://titanr-gpl.a01.dexmedia.com:3000/gpl/put/gplroduct/enterpriseItemId/%s/suspend",
    "GPL-PUT-CANCEL":"https://titanr-gpl.a01.dexmedia.com:3000/gpl/put/gplproduct/enterpriseItemId/%s/cancel",
    "GPL-PUT-RESUME":"https://titanr-gpl.a01.dexmedia.com:3000/gpl/put/gplproduct/enterpriseItemId/%s/resume"
 },
 esb: 'https://esb-cfit.dexmedia.com/enterprise/v3/update?idtype=eiid&action=updateitem',
 esb_sf: 'http://esb-cfit-int.dexmedia.com/enterprise/v1/fulfillment/item',
  salesfoforce: 'some salesforce url1',
  esbuserid: process.env.esbuserid || 'esbtitant',
  esbpassword: process.env.esbpassword || '06TEB6ATI$!',
  sourceSystem: 'TITAN'
}