import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { configOKTA } from './okta.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    OktaAuthModule 
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: configOKTA },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
