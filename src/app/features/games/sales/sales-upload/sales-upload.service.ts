import { Injectable } from '@angular/core';

import { ChartHistoryService } from '../../+shared/chart-history/chart-history.service';

///

@Injectable()
export class SalesUploadService {
  constructor(private chartHistoryService: ChartHistoryService) {}

  notify(newDate: Date) {
    this.chartHistoryService.notify(newDate);
  }
}
