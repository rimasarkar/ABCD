import { ActivatedRoute } from '@angular/router';
import { OlmService } from './olm.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olm-details',
  templateUrl: './olm-details.component.html',
  styleUrls: ['./olm-details.component.css']
})
export class OlmDetailsComponent implements OnInit {

  _route: any;
  enterpriseId: String;
  formActive = false;
  error: string;
  olmData: any = { data: {}, schema: {} };
  jsonFormOptions: any = {
    addSubmit: false,
    debug: false,
    loadExternalAssets: true,
    returnEmptyFields: false
  };


  constructor(private olmService: OlmService, public route: ActivatedRoute, private _router:Router) {
    this.route.params.subscribe(res => this.enterpriseId = res.id);
  }

  generateForm(data) {
    this.formActive = false;
    this.olmService.getSchema().subscribe(schema => {
      this.olmData.schema = schema;
      this.olmData.data = data;
      this.formActive = true;
      console.log(this.olmData);
    });
  }

  ngOnInit() {
    this.olmService.getOlmData(this.enterpriseId).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)).ProductHeader.fulfilmentStatus);
      let accountId = JSON.parse(JSON.stringify(data)).ProductHeader.enterpriseAccountId;
      let businessLocation = JSON.parse(JSON.stringify(data)).ProductHeader.businessLocationId;
      let workflowstatus = (JSON.parse(JSON.stringify(data)).ProductHeader.fulfilmentStatus);
      if (workflowstatus == "Completed") {
        // call the serive for the yext data to retrive
        this.olmService.getOlmYextData(accountId, businessLocation).subscribe(data => {
          var obj: any = {}, catList: any = {}, catArray: any = [], lanDetails: any = {}, lanArray: any = [], locData: any = {},
            prodHeader: any = {}, payDetails: any = {}, payArray: any = [];

          catList['yextCategoryId'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.categoryIds[0];
          catList['addedBy'] = "Yext";
          catList['addedDate'] = "";
          catList['updatedBy'] = "Yext";
          catList['updatedDate'] = "";
          catArray.push(catList);

          prodHeader['enterpriseAccountId'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.accountId;
          prodHeader['fulfilmentStatus'] = "Completed";
          prodHeader['producttype'] = "OLM";
          prodHeader['productTier'] = "GENERAL";
          prodHeader['addedBy'] = "Yext";
          prodHeader['addedDate'] = "";
          prodHeader['updatedBy'] = "Yext";
          prodHeader['updatedDate'] = "";

          locData['addedBy'] = 'Yext';
          locData['addedDate'] = "";
          locData['updatedBy'] = "Yext";
          locData['yextRequestId'] = "";
          locData['skuId'] = "";
          locData['agreementId'] = "";
          locData['businessName'] = "";
          locData['contactFirstName'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.firstName;
          locData['contactMiddleName'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.middleName;
          locData['contactLastName'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.lastName;
          // locData['contactEmail'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.emails[0];
          locData['contactPhone'] = "";
          locData['phone'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.phone;
          locData['localPhone'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.localPhone;
          locData['alternatePhone'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.alternatePhone;
          locData['faxPhone'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.faxPhone;
          locData['mobilePhone'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.mobilePhone;
          locData['tollFreePhone'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.tollFreePhone;
          locData['ttyPhone'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.ttyPhone;
          locData['businessDescription'] = "";
          locData['isPhoneTracked'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.isPhoneTracked;
          locData['locationType'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.locationType;
          locData['locationName'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.locationName;
          //locData['specialties'] = null;
          locData['zip4'] = "";
          locData['hideAddress'] = "";
          locData['optOutCallTracking'] = "";
          // locData['gender'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.gender;
          // locData['npi'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.npi;
          //locData['officeName'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.officeName;
          locData['address'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.address;
          locData['address2'] = "";
          locData['suppressAddress'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.suppressAddress;
          locData['displayAddress'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.displayAddress;
          locData['state'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.state;
          locData['subLocality'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.subLocality;
          locData['zip'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.zip;
          locData['countryCode'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.countryCode;
          locData['featuredMessage'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.featuredMessage;
          locData['uberLinkType'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.uberLinkType;
          locData['uberLinkText'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.uberLinkText;
          locData['uberTripBrandingText'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.uberTripBrandingText;
          locData['uberTripBrandingUrl'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.uberTripBrandingUrl;
          locData['uberTripBrandingDescription'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.uberTripBrandingDescription;
          locData['uberClientId'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.uberClientId;
          locData['uberEmbedCode'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.uberEmbedCode;
          locData['uberLink'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.uberLink;
          locData['uberLinkRaw'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.uberLinkRaw;
          locData['yearEstablished'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yearEstablished;
          locData['displayLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.displayLat;
          locData['displayLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.displayLng;
          locData['routableLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.routableLat;
          locData['routableLongitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.routableLng;
          locData['walkableLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.walkableLat;
          locData['walkableLongitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.walkableLng;
          locData['pickupLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.pickupLat;
          locData['pickupLongitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.pickupLng;
          locData['dropoffLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.dropoffLat;
          locData['dropoffLongitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.dropoffLng;
          locData['yextDisplayLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yextDisplayLat;
          locData['yextDisplayLongitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yextDisplayLng;
          locData['yextRoutableLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yextRoutableLat;
          locData['yextRoutableLongitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yextRoutableLng;
          locData['yextWalkableLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yextWalkableLat;
          locData['yextPickupLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yextWalkableLng;
          locData['yextPickupLongitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yextPickupLat;
          locData['yextDropoffLatitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yextDropoffLat;
          locData['yextDropoffLongitude'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.yextDropoffLng;

          var logoUrl: any = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response && JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.logo ? JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.logo.url : null;
          locData['logoUrl'] = logoUrl;

          locData['instagramHandle'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.instagramHandle;
          locData['twitterHandle'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.twitterHandle;
          lanDetails['language'] = JSON.parse(JSON.stringify(data)).retrievelocationpayloadresponse.response.language;
          lanDetails['addedBy'] = "Yext";
          lanDetails['addedDate'] = "";
          lanDetails['updatedBy'] = "Yext";
          lanDetails['updatedDate'] = "";
          lanArray.push(lanDetails);

          payDetails['paymentOption'] = null;
          payDetails['addedBy'] = "Yext";
          payDetails['addedDate'] = null;
          payDetails['updatedBy'] = "Yext";
          payDetails['updatedDate'] = null;
          payArray.push(payDetails);


          obj['ProductHeader'] = prodHeader;
          obj['YextLocationData'] = locData;
          obj['YextCategoryList'] = catArray;
          obj['YextLanguageDetails'] = lanArray;
          obj['YextPaymentDetails'] = payArray;

          this.generateForm(obj);
        })
      } else {
        this.generateForm(data);
        console.log(JSON.parse(JSON.stringify(data)).YextPaymentDetails[0].paymentOption);
      }
    }, err => {
      this.error = err.error;
    });

    
  }

  onBack(olmData) :void {    
    this._router.navigate(['/productinstance/' + olmData.data.ProductHeader.enterpriseItemId]);
  }
}