import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-acd',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}
