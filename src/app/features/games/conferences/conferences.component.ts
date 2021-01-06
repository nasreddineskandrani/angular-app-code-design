import { Component } from "@angular/core";

@Component({
  selector: "app-conferences",
  template: `
    <h1>Conferences</h1>
    <hr />

    <plotly-chart-history> </plotly-chart-history>
  `
})
export class ConferencesComponent {}
