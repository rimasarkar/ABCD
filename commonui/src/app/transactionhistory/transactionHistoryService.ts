import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class TransactionHistoryService {

  constructor(private http: HttpClient) { }

  getSchema() {
    return this.http.get('./assets/producthistory.json').catch(e => Observable.of({ failure: e }));
  }
  getProduct(enterpriseItemId) {
    let username: string = 'ESB';
    let password: string = 'BdL5C35jwNC2K6Vs';
    let headers = new HttpHeaders().set(
      'Authorization', 'Basic ' + btoa(username + ":" + password
      ));

    headers = headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
      let url="/assets/producthistory.json";      
     return this.http.get(url);
    //return this.http.get('https://titand.dexmedia.com/common/product/instanceheaderdata/enterpriseItemId/'+ enterpriseItemId);
  }
}
