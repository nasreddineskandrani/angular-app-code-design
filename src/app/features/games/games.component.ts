import { Component, OnDestroy } from '@angular/core';
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
  constructor(private gamesService: GamesService) {}

  ngOnDestroy(): void {
    this.gamesService.notify();
  }
}
