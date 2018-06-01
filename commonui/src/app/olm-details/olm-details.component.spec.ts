import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { OlmDetailsComponent } from "./olm-details.component";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { OlmService } from "./olm.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Observable } from "rxjs/Observable";

describe('OlmDetailsComponent', () => {
  let fixture: ComponentFixture<OlmDetailsComponent>;
  let debugElement: DebugElement;
  let olmService: OlmService;
  let olmSpy;

  
  let serviceResponse = {
    "ProductHeader": {
      "productinstance": 1000,
      "enterpriseAccountId": "Test001",
      "enterpriseItemId": "OLMDEV2",
      "businessLocationId": "PPT2",
      "producttype": "OLM",
      "productTier": "GENERAL",
      "salesChannelCode": "LOCAL",
      "transactionType": "SUSPEND",
      "instanceStatus": "Suspend",
      "fulfilmentStatus": "InProgress",
      "primaryItemIdForAddon": "111",
      "previousItemId": "222",
      "serviceStartDate": null,
      "serviceEndDate": "2017-09-21",
      "futureRequestedDate": "2017-12-19",
      "addedBy": "babus01",
      "addedDate": "2017-12-19T20:13:50.000Z",
      "updatedBy": "RM Process",
      "updatedDate": "2018-04-05T05:56:01.000Z"
    },
    "YextLocationData":{
      "yextRequestId":12,
      "skuId":"34",
      "agreementId":123,
      "businessName":"Test Telecommunications",
      "contactFirstName":"Don4",
      "contactMiddleName":"Wareham",
      "contactLastName":"waren",
      "contactEmail":"ddennis@eastcoastfire.net",
      "contactPhone":"8008888601",
      "phone":null,
      "businessDescription":null,
      "isPhoneTracked":1,
      "locationType":"LOCATION",
      "locationName":"Dallas",
      "specialties":null,
      "zip4":null,
      "hideAddress":null,
      "officeName":null,
      "gender":null,
      "npi":null,
      "address":"240 S EL MOLINO AVE",
      "address2":null,
      "suppressAddress":0,
      "displayAddress":"DexMedia Office",
      "city":"Pasadena",
      "state":"California",
      "subLocality":"California",
      "zip":"91103",
      "countryCode":"US",
      "localPhone":"0123456789",
      "alternatePhone":"9876543210",
      "faxPhone":null,
      "mobilePhone":null,
      "tollfreePhone":null,
      "ttyPhone":null,
      "featuredMessage":"featured message",
      "businessHours":"2:9:00:17:00,3:9:00:17:00,7:10:00:16:00",
      "logoUrl":null,
      "logoDescription":null,
      "logoDetails":null,
      "logoAlternateText":null,
      "logoWidth":null,
      "logoHeight":null,
      "instagramHandle":null,
      "twitterHandle":null,
      "websiteUrl":null,
      "googleWebsiteOverride":null,
      "googleCoverPhotoUrl":null,
      "googleCoverPhotoDescription":null,
      "googleCoverPhotoDetails":null,
      "googleCoverPhotoAlternateText":null,
      "googleCoverPhotoWidth":null,
      "googleCoverPhotoHeight":null,
      "googleProfilePhotoUrl":null,
      "googleProfilePhotoDescription":null,
      "googleProfilePhotoDetails":null,
      "googleProfilePhotoAlternateText":null,
      "googleProfilePhotoWidth":null,
      "googleProfilePhotoHeight":null,
      "facebookPageUrl":null,
      "facebookCoverPhotoUrl":null,
      "facebookCoverPhotoDescription":null,
      "facebookCoverPhotoDetails":null,
      "facebookCoverPhotoAlternateText":null,
      "facebookCoverPhotoWidth":null,
      "facebookCoverPhotoHeight":null,
      "facebookProfilePictureUrl":null,
      "facebookProfilePictureDescription":null,
      "facebookProfilePictureDetails":null,
      "facebookProfilePictureAlternateText":null,
      "facebookProfilePictureWidth":null,
      "facebookProfilePictureHeight":null,
      "uberLinkType":null,
      "uberLinkText":null,
      "uberTripBrandingText":null,
      "uberTripBrandingUrl":null,
      "uberTripBrandingDescription":null,
      "uberClientId":null,
      "uberEmbedCode":null,
      "uberLink":null,
      "uberLinkRaw":null,
      "yearEstablished":"2016",
      "displayLatitude":0,
      "displayLongitude":0,
      "routableLatitude":0,
      "routableLongitude":0,
      "walkableLatitude":0,
      "walkableLongitude":0,
      "pickupLatitude":0,
      "pickupLongitude":0,
      "dropoffLatitude":0,
      "dropoffLongitude":0,
      "yextDisplayLatitude":0,
      "yextDisplayLongitude":0,
      "yextRoutableLatitude":0,
      "yextRoutableLongitude":0,
      "yextWalkableLatitude":0,
      "yextPickupLatitude":0,
      "yextPickupLongitude":0,
      "yextDropoffLatitude":0,
      "yextDropoffLongitude":0,
      "addedBy":"SYS",
      "addedDate":"2017-12-19T20:13:50.000Z",
      "updatedBy":"SYS",
      "updatedDate":"2017-12-19T20:13:50.000Z"
    },
    "YextCategoryList":[
      {
        "language":"English",
        "addedBy":"SYS",
        "addedDate":"2017-12-19T20:13:50.000Z",
        "updatedBy":"SYS",
        "updatedDate":"2017-12-19T20:13:50.000Z"
      }
    ],
    "YextLanguageDetails":
    [
      {
        "language":"English",
        "addedBy":"SYS",
        "addedDate":"2017-12-19T20:13:50.000Z",
        "updatedBy":"SYS",
        "updatedDate":"2017-12-19T20:13:50.000Z"
      }
    ],
    "YextPaymentDetails":
    [
      {"paymentOption":"By cash",
      "addedBy":"SYS",
      "addedDate":"2017-12-19T20:13:50.000Z",
      "updatedBy":"SYS",
      "updatedDate":"2017-12-19T20:13:50.000Z"
    }
  ]
};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule,RouterModule,HttpClientModule],
      declarations: [
        OlmDetailsComponent
      ],
      providers: [ HttpClient,OlmService ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OlmDetailsComponent);
    debugElement = fixture.debugElement;

    olmService = debugElement.injector.get(OlmService);
    
  }));

  it('should call  the service', () => {
    
    olmSpy = spyOn(olmService, 'getOlmData').and.callThrough();
    expect('olmService').toBeDefined();
    //expect(olmSpy);
    
    //expect(olmService.getOlmData).toBe(serviceResponse.YextLocationData);
    //expect(olmSpy).toHaveBeenCalled();
    //expect(olmSpy).toHaveBeenCalledWith('OLMDEV2');
  });

  // it('should call the olm getOlmdata service', () => { 
 
  //     let t = 'OLMDEV2';   
  //     let component: OlmDetailsComponent;
  //     let spy = spyOn(olmService, 'getOlmData').and.callFake(t => {
  //       console.log (t);
  //       return Observable.from([serviceResponse]);
  //     })
  //    // component.ngOnInit();
  //     expect(spy).toHaveBeenCalled();
  //     expect(component.olmData).toBe(serviceResponse.YextLocationData);
  //   });
});