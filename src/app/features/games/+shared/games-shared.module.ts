import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

///

import { ChartHistoryComponent } from './chart-history/chart-history.component';

@NgModule({
  imports: [CommonModule, PlotlyModule],
  declarations: [ChartHistoryComponent],
  providers: [],
  exports: [ChartHistoryComponent]
})
export class GamesSharedModule {}
