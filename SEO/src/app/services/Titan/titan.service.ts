import { NotesRes } from './../../model/notesres';
import { SeoData } from './../../model/seoData';
import { OlmData } from '../../model/olmData';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TitanService {

  constructor(public http: HttpClient) { }

  getSeodata(enterPriseItemId: string): Observable<SeoData> {
    let username: string = 'ESB';
    let password: string = 'BdL5C35jwNC2K6Vs';
    let headers = new HttpHeaders().set(
      'Authorization', 'Basic ' + btoa(username + ":" + password
      ));

    headers = headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');

    return this.http.get<SeoData>('https://titand.dexmedia.com/seo/get/seoproduct/productinstanceid/' + enterPriseItemId, {
      headers: headers
    })
      .map(res => res)
  }

  public getNotesByPrcsInstncID(): Observable<NotesRes> {
    let username: string = 'ESB';
    let password: string = 'BdL5C35jwNC2K6Vs';
    let headers = new HttpHeaders().set(
      'Authorization', 'Basic ' + btoa(username + ":" + password
      ));

    headers = headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');

    return this.http.get<NotesRes>('https://titand.dexmedia.com/common/retrievenotes/productinstanceid/1173', { headers: headers })
      .map(res => res
      )
  }

  getOlmData(enterPriseItemId: string): Observable<OlmData> {
    let username: string = 'ESB';
    let password: string = 'BdL5C35jwNC2K6Vs';
    let headers = new HttpHeaders().set(
      'Authorization', 'Basic ' + btoa(username + ":" + password
      ));

    headers = headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');

    return this.http.get<OlmData>('https://titand.dexmedia.com/common/product/enterpriseItemId/' + enterPriseItemId, {
      headers: headers             
    })
      .map(res => res)
  }


}