
import { OlmService } from './olm-details/olm.service';
import { SeoService } from './seo-details/seo.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { Bootstrap4FrameworkModule, JsonSchemaFormModule, Bootstrap4Framework, JsonSchemaFormService, WidgetLibraryService,
   FrameworkLibraryService, Framework } from 'angular2-json-schema-form';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { OktaAuthService } from './guards/okta-auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ProductinstanceComponent } from './productinstance/productinstance.component';
import { SfassetviewComponent } from './sfassetview/sfassetview.component';
import { ProductdataComponent } from './productdata/productdata.component';

import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';
import { TransactionHistoryService } from './transactionhistory/TransactionHistoryService';
import { ProductinstanceService } from './productinstance/productinstance.service';
import { SeoDetailsComponent } from './seo-details/seo-details.component';
import { OlmDetailsComponent } from './olm-details/olm-details.component';



@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    PagenotfoundComponent,
    HomeComponent,
    ProductinstanceComponent,
    SfassetviewComponent,
    ProductdataComponent,
    TransactionhistoryComponent,
    SeoDetailsComponent,
    OlmDetailsComponent
    
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    NgbModule.forRoot(), 
    Bootstrap4FrameworkModule,
    JsonSchemaFormModule.forRoot(Bootstrap4FrameworkModule),
    {
      ngModule: JsonSchemaFormModule,
      providers: [
          JsonSchemaFormService,
          FrameworkLibraryService,
          WidgetLibraryService,
          {provide: Framework, useClass: Bootstrap4FrameworkModule, multi: true}          
      ]      
  }
    ],
  
    
    
  
  providers: [
    SeoService,
    OlmService,
    ProductinstanceService,
    OktaAuthService,
    AuthGuardService,
    TransactionHistoryService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
