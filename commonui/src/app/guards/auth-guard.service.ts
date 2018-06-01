import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from './okta-auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  oktaAuth;
  authenticated;

  constructor(private okta: OktaAuthService, private router: Router) {
    this.authenticated = okta.isAuthenticated()
    this.oktaAuth = okta;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticated) { 
      console.log('authenticated is true in guard'); 
      return true; 
    }
    console.log('state url is' + state.url);
    localStorage.titanangulareffererPath = state.url;
    console.log('redirect uri' + localStorage.titanangulareffererPath);
    // Redirect to login flow.
    this.oktaAuth.login();
    return false;
  }

}
