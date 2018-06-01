import { SeoDetailsComponent } from './seo-details/seo-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TitanService } from './services/Titan/titan.service';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { OlmDetailsComponent } from './olm-details/olm-details.component';
// Create Routes
const appRoutes: Routes = [
  { path: 'seoDetails', component: SeoDetailsComponent  },
  { path: 'notesDetails', component: NotesDetailsComponent  },
  { path: 'olmDetails', component: OlmDetailsComponent  },

];

@NgModule({
  declarations: [
    AppComponent,
    SeoDetailsComponent,
    NotesDetailsComponent,
    OlmDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    TitanService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
