import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }
  
  // https://developer.okta.com/docs/guides/sign-into-spa/angular/before-you-begin/

  // WHY you should do it backend
  // https://devforum.okta.com/t/react-sdk-signon-widget-cookies-vs-localstorage/1144/2

  // express backend solution: https://developer.okta.com/blog/2019/05/31/simple-auth-express-fifteen-minutes

  login() {
    this.oktaAuth.signInWithRedirect().then(() => {
      this.router.navigate(['protected']);
    });
  }
}
