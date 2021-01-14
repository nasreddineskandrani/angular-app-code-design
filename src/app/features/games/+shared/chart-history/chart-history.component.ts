import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FetchGameHistory } from './+state/chart-history.actions';
import { select, Store } from '@ngrx/store';
import { GamesState } from '../../+state/games.reducer';
import { getGamesHistoryPerId } from '../../+state/games.selectors';
import { filter, map } from 'rxjs/operators';

const last10Days = 10;

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

@UntilDestroy()
@Component({
  selector: 'app-plotly-chart-history',
  template: `
    <div *ngIf="graph$ | async as graph">
      <div>{{ startDate | date }} <b> to </b> {{ endDate | date }}</div>
      <div *ngIf="selectedDate" style="color: green">
        <div style="font-size: 1.5rem">
          Selection: {{ selectedDate | date }}
          <span style="color: red; cursor: pointer;" (click)="clearSelection()"
            >[X]</span
          >
        </div>
      </div>
      <div style="border: 1px solid black; height: 100%;">
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

  startDate: Date;
  endDate: Date;
  selectedDate: Date;

  sales: any;

  public graph$;

  constructor(
    private store: Store<GamesState>
    /*
    @Inject(HISTORY_API_SERVICE) private historyApiService: IApiService,
    private chartHistoryService: ChartHistoryService
    */
  ) {}

  ngOnInit(): void {
    this.listeners();

    this.endDate = new Date();
    const start = new Date(this.endDate);
    start.setDate(start.getDate() - last10Days);
    this.startDate = start;
    this.store.dispatch(FetchGameHistory({id: this.id, startDate: this.startDate, endDate: this.endDate }));
  }

  listeners(): void {
    this.graph$ = this.store.pipe(
        select(getGamesHistoryPerId(this.id)),
        filter(s => !!s),
        map(s => {
          return getConfig({
            X: s.map(item => item.date),
            Y: s.map(item => item.cash),
            xRange: [this.startDate, this.endDate]
          });
        })
      );
  }

  /*
  ngOnInit() {
    this.store.dispatch(GameHistoryInit);

    if (this.chartHistoryService.startDate) {
      this.startDate = this.chartHistoryService.startDate;
      this.endDate = this.chartHistoryService.endDate;
      this.selectedDate = this.chartHistoryService.selectedDate;
      this.sales = this.chartHistoryService.data;
      this.graph = getConfig({
        X: this.sales.map(item => item.date),
        Y: this.sales.map(item => item.cash),
        xRange: [this.startDate, this.endDate]
      });
    } else {
      this.endDate = new Date();
      const start = new Date(this.endDate);
      start.setDate(start.getDate() - last10Days);
      this.startDate = start;

      this.historyApiService
        .get(this.startDate, this.endDate)
        .pipe(untilDestroyed(this))
        .subscribe(sales => {
          this.sales = sales;
          this.graph = getConfig({
            X: this.sales.map(item => item.date),
            Y: this.sales.map(item => item.cash),
            xRange: [this.startDate, this.endDate]
          });
        });
    }

    this.chartHistoryService.onNewData$
      .pipe(untilDestroyed(this))
      .subscribe(newDate => {
        this.sales = [
          ...this.sales,
          ...[
            {
              date: newDate,
              cash: 1,
              nb: 30
            }
          ]
        ];
        this.graph = getConfig({
          X: this.sales.map(item => item.date),
          Y: this.sales.map(item => item.cash),
          xRange: [this.startDate, this.endDate]
        });
      });
  }

  ngOnDestroy() {
    this.chartHistoryService.startDate = this.startDate;
    this.chartHistoryService.endDate = this.endDate;
    this.chartHistoryService.selectedDate = this.selectedDate;
    this.chartHistoryService.data = this.sales;
  }

  addPastData() {
    const endDate = new Date(this.startDate);

    const start = new Date(endDate);
    start.setDate(start.getDate() - 180);
    this.startDate = start;

    this.historyApiService
      .get(this.startDate, endDate)
      .pipe(untilDestroyed(this))
      .subscribe(sales => {
        this.sales = [...sales, ...this.sales];
        this.graph = getConfig({
          X: this.sales.map(item => item.date),
          Y: this.sales.map(item => item.cash),
          xRange: [this.startDate, this.endDate]
        });
      });
  }
  */

  addPastData(): void {
    const endDate = new Date(this.startDate);
    const start = new Date(endDate);
    start.setDate(start.getDate() - 180);
    this.startDate = start;
    this.store.dispatch(FetchGameHistory({id: this.id, startDate: this.startDate, endDate: this.endDate }));
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
