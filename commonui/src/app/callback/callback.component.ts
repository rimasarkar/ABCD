import { Component } from '@angular/core';
import { OktaAuthService } from '../guards/okta-auth.service';
import { Router } from '@angular/router';

@Component({ template: `` })
export class CallbackComponent {

  constructor(private okta: OktaAuthService,private router: Router) {
    // Handles the response from Okta and parses tokens
    okta.handleAuthentication();
    //validate token
    if(okta.validateToken()) {
    console.log('after handle authentication'+localStorage.titanangulareffererPath);
    this.router.navigate([ localStorage.titanangulareffererPath ]);
    } else {
      console.log('token not validated')
    }
  }
}