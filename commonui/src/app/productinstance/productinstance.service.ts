import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductinstanceService {

  constructor(private http: HttpClient) { }

  getSchema() {
    return this.http.get('./assets/schemas/productinstance.json').catch(e => Observable.of({ failure: e }));
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

    return this.http.get('https://titand.dexmedia.com/common/product/instanceheaderdata/enterpriseItemId/'+ enterpriseItemId);
  }
}
