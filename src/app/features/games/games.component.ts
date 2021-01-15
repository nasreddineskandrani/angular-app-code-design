import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeaveGamesPage } from './+state/games.actions';
import { GamesState } from './+state/games.reducer';
import { GamesService } from './games.service';

@Component({
  selector: 'app-sales',
  template: `
    <h1>Games</h1>
    <hr />
    <div>
      <button routerLink="/games/sales">
        Sales
      </button>
      |
      <button routerLink="/games/conferences">
        Conferences
      </button>
      <hr />

      <router-outlet></router-outlet>
    </div>
  `
})
export class GamesComponent implements OnDestroy {
  constructor(private store: Store<GamesState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(LeaveGamesPage());
  }
}
