import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Observable, Subject } from "rxjs";
import 'rxjs/add/observable/from';
import { SeoDetailsComponent } from './seo-details.component';
import { SeoService } from './seo.service';
import { HttpClientModule } from '@angular/common/http';

import { ActivatedRoute, Params } from '@angular/router';
class MockActivatedRoute extends ActivatedRoute {
  constructor() {
      super();
      this.params = Observable.of({enterpriseId: "1079"});
  }
}

describe(' SeoDetailsComponent', () => {
  let component: SeoDetailsComponent;  
  let fixture: ComponentFixture<SeoDetailsComponent>;
  let service: SeoService;
  let route: MockActivatedRoute;
  let serviceResponse = {
    "ProductHeader": {
      "productinstance": 1038,
      "enterpriseAccountId": "BBCJ6656",
      "enterpriseItemId": "BBCSEO02",
      "businessLocationId": "2063677246",
      "producttype": "SEO",
      "productTier": "PREMIUM",
      "salesChannelCode": "LOCAL",
      "transactionType": "NEW",
      "instanceStatus": "New",
      "fulfilmentStatus": "InProgress",
      "primaryItemIdForAddon": null,
      "previousItemId": null,
      "serviceStartDate": null,
      "serviceEndDate": null,
      "futureRequestedDate": "2017-08-21",
      "addedBy": "babus01",
      "addedDate": "2017-10-13T21:03:56.000Z",
      "updatedBy": "babus01",
      "updatedDate": "2017-10-13T21:04:50.000Z"
    },
    "product": {
      "FirstName": "Don02",
      "LastName": "Dennis02",
      "Phone": "9876543210",
      "EmailID": "ddennis@eastcoastfire.net",
      "BusinessName": "East Coast Fire & Ventilation",
      "PrimaryCity": "West Wareham",
      "confirmationNumber": "1234",
      "proposalId": "67656",
      "notes": "test",
      "primaryCategoryId": "517824",
      "primaryCategoryName": "Fire Extinguishers",
      "addedBy": "babus01",
      "addedDate": "2017-10-13T21:03:56.000Z",
      "updatedBy": "babus01",
      "updatedDate": "2017-10-13T21:03:56.000Z"
    },
    "WebsiteUrlList": [
      {
        "url": "www.eastcoastfire.net",
        "isDexmediaSite": "N",
        "isPrimary": "Y",
        "isNew": "Y",
        "username": null,
        "password": null,
        "addedBy": "babus01",
        "addedDate": "2017-10-13T21:03:57.000Z",
        "updatedBy": "babus01",
        "updatedDate": "2017-10-13T21:03:57.000Z"
      }
    ],
    "CategoryList": [
      {
        "CategoryId": "523477",
        "CategoryName": "Fire Protection Consultants",
        "addedBy": "babus01",
        "addedDate": "2017-10-13T21:03:57.000Z",
        "updatedBy": "babus01",
        "updatedDate": "2017-10-13T21:03:57.000Z"
      }
    ]
  };
  let params: Subject<Params>;

beforeEach(() => {
  
})

  beforeEach(() => {
    service = new SeoService(null);
    route = new MockActivatedRoute;
  //   params = new Subject<Params>();
  //   TestBed.configureTestingModule({
  //   providers: [
  //     { provide: ActivatedRoute, useValue: { params: params }}
  //   ]
  // })
  // {
  //   route: ActivatedRoute,
  //   useValue: {
  //     params: Observable.of({id: 123})
  //   }
  // }
    
    component = new SeoDetailsComponent(service,route);
  });

  it('should call the titan getseodata service', () => {    
    let spy = spyOn(service, 'getSeoData').and.callFake(t => {
      return Observable.from([serviceResponse]);
    })
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.seoData.data).toBe(serviceResponse);
  });

  
  // it('should load getseo data service from the server ',() =>{
  //   TestBed.configureTestingModule({
  //     declarations: [SeoDetailsComponent],
  //   })
  //   fixture = TestBed.createComponent(SeoDetailsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   let service = TestBed.get(TitanService);
  //  ///let service =  fixture.debugElement.injector.get(TitanService);
  //  let spy = spyOn(service,'getSeodata').and.returnValue([Observable.from([serviceResponse])]);
  //  fixture.detectChanges();
  //  expect(component.seoheader).toBe(serviceResponse.product);
  // })

});
