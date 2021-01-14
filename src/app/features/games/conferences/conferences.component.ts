import { Component } from '@angular/core';

@Component({
  selector: 'app-conferences',
  template: `
    <h1>Conferences</h1>
    <hr />

    <app-plotly-chart-history id='conferences'> </app-plotly-chart-history>
  `
})
export class ConferencesComponent {}
