import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class OlmService {  
  
  constructor(private http: HttpClient) { }

  getSchema() {
    return this.http.get(environment.schemaPath + 'olm.json').catch(e => Observable.of({ failure: e }));      
  }


  getOlmData(enterPriseItemId)  {    
    let headers = new HttpHeaders().set( 'Authorization', 'Basic ' + btoa(environment.titanUser + ":" + environment.titanPwd ));

    headers = headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    return this.http.get(environment.productUrl + enterPriseItemId) ;
  }

  getOlmYextData(accountId, businessLocation)  {
    let headers = new HttpHeaders().set( 'Authorization', 'Basic ' + btoa(environment.titanUser + ":" + environment.titanPwd ));

    headers = headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
var x = environment.yextproductUrl + 'accountId='+accountId+'&locationId=' + businessLocation + '&resolvePlaceholders=true&transactionid='+ businessLocation;
console.log(x);
    return this.http.get(x) ;
  }

}