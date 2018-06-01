import { OlmDetailsComponent } from './olm-details/olm-details.component';
import { SeoDetailsComponent } from './seo-details/seo-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { ProductdataComponent } from './productdata/productdata.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';
import { ProductinstanceComponent } from './productinstance/productinstance.component';
import { SfassetviewComponent } from './sfassetview/sfassetview.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
    { path: 'callback', component: CallbackComponent },
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuardService ] },
    { path: 'productinstance/:id', component: ProductinstanceComponent },
    { path: 'contenthistory/:id', component: TransactionhistoryComponent },
    { path: 'productdata/:id', component: ProductdataComponent },
    { path: 'sfassetview', component: SfassetviewComponent },
    { path: 'seo/:id', component: SeoDetailsComponent },
    { path: 'olm/:id', component: OlmDetailsComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [
        NgbModule.forRoot(), 
        RouterModule.forRoot(appRoutes/*,{ enableTracing: true }*/,)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
