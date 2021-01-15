import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GamesState } from '../../+state/games.reducer';
import { getGamesHistoryDateRange, getGamesHistoryPerId } from '../../+state/games.selectors';
import { concatMap, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { AddPastGameHistory, InitGameHistory } from './+state/chart-history.actions';
import { of } from 'rxjs';

function getConfig(partial: any): {} {
  return {
    data: [
      {
        x: partial.X,
        y: partial.Y,
        type: 'scatter',
        mode: 'markers'
      }
    ],
    layout: {
      // title: "A Fancy Plot",
      height: '100%',
      xaxis: {
        type: 'date',
        range: partial.xRange
      }
    },
    config: {
      responsive: true
    }
  };
}

@Component({
  selector: 'app-plotly-chart-history',
  template: `
    <div>
      <div *ngIf="range$ | async as range">{{ range.startDate | date }} <b> to </b> {{ range.endDate | date }}</div>
      <div *ngIf="selectedDate" style="color: green">
        <div style="font-size: 1.5rem">
          Selection: {{ selectedDate | date }}
          <span style="color: red; cursor: pointer;" (click)="clearSelection()"
            >[X]</span
          >
        </div>
      </div>
      <div *ngIf="graph$ | async as graph" style="border: 1px solid black; height: 100%;">
        <plotly-plot
          [data]="graph.data"
          [layout]="graph.layout"
          [config]="graph.config"
          [useResizeHandler]="true"
          (plotlyClick)="plotlyClick($event)"
        ></plotly-plot>
      </div>
      <div>
        <button (click)="addPastData()">add past 6 months</button>
      </div>
    </div>
  `
})
export class ChartHistoryComponent implements OnInit {
  @Input() id: string;

  @Output()
  dateSelectionChange = new EventEmitter<Date>();

  selectedDate: Date;

  public graph$;
  public range$;

  constructor(
    private store: Store<GamesState>
  ) {}

  ngOnInit(): void {
    this.listeners();

  }

  listeners(): void {
    this.range$ = this.store.pipe(
      select(getGamesHistoryDateRange(this.id)),
      filter(r => !r),
      tap(() => {
        this.store.dispatch(InitGameHistory({id: this.id }));
      })
    );

    this.graph$ = this.store.pipe(
        select(getGamesHistoryPerId(this.id)),
        filter(s => !!s),
        concatMap(s => of(s).pipe(
          withLatestFrom(this.store.pipe(select(getGamesHistoryDateRange(this.id))))
        )),
        map(([s, latest]) => {
          return getConfig({
            X: s.map(item => item.date),
            Y: s.map(item => item.cash),
            xRange: [latest.startDate, latest.endDate]
          });
        })
      );
  }

  addPastData(): void {
    this.store.dispatch(AddPastGameHistory({id: this.id }));
  }

  plotlyClick(a: any): void {
    this.selectedDate = new Date(a.points[0].x);
    this.dateSelectionChange.emit(this.selectedDate);
  }

  clearSelection(): void {
    this.selectedDate = undefined;
    this.dateSelectionChange.emit(undefined);
  }
}
