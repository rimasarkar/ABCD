import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as OktaAuth from '@okta/okta-auth-js';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class OktaAuthService {

  oktaAuth = new OktaAuth({
    url: 'https://dexmedia.oktapreview.com',
    clientId: '0oae57vd4pOfyXzqS0h7',
    issuer: 'https://dexmedia.oktapreview.com/oauth2/default',
    redirectUri: 'http://localhost:3000/callback'
  });

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) { }

  isAuthenticated() {
    // Checks for not expired idToken in the TokenManger.
    if (this.oktaAuth.tokenManager.get('idToken')) {
      var token = this.oktaAuth.tokenManager.get('idToken').idToken;
      console.log('token expired' + this.jwtHelper.isTokenExpired(token));
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  login() {
    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile']
    })
      .fail(function (err) {
        console.error(err);
      });
  }

  async handleAuthentication() {
    try {
      const tokens = await this.oktaAuth.token.parseFromUrl();
      tokens.forEach(token => {
        if (token.idToken) {
          this.oktaAuth.tokenManager.add('idToken', token);
        }
        if (token.accessToken) {
          this.oktaAuth.tokenManager.add('accessToken', token);
        }
      });
    } catch(error) {
      console.error(error);
        //this.router.navigate(["home"]);
    }
  }

  async logout() {
    this.oktaAuth.tokenManager.clear();
    this.router.navigate(["logout"]);
    //await this.oktaAuth.signOut();
  }

  /**
 * Returns the current accessToken in the tokenManager.
 */
  getAccessToken() {
    return this.oktaAuth.tokenManager.get('accessToken');
  }

  /**
   * Returns the current idToken in the tokenManager.
   */
  getIdToken() {
    return this.oktaAuth.tokenManager.get('idToken');
  }

  validateToken() {
    return this.oktaAuth.token.verify(this.oktaAuth.tokenManager.get('idToken'));
  }

}
