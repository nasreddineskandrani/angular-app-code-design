import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Subject } from 'rxjs';

///
import { GamesService } from '../../games.service';

@UntilDestroy()
@Injectable()
export class ChartHistoryService {
  startDate: Date | undefined;
  endDate: Date | undefined;
  selectedDate: Date | undefined;
  data: any[];

  private onNewData = new Subject();
  onNewData$ = this.onNewData.asObservable();

  constructor(private gamesService: GamesService) {
    this.gamesService.leavingGamesModule$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.clearAll();
      });
  }

  notify(newDate: Date) {
    this.onNewData.next(newDate);
  }

  clearAll() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.selectedDate = undefined;
    this.data = [];
  }
}
