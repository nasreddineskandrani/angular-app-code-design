import { Injectable } from "@angular/core";

import { Subject } from "rxjs";

///

@Injectable()
export class GamesService {
  private leavingGamesModule = new Subject();
  leavingGamesModule$ = this.leavingGamesModule.asObservable();

  constructor() {}

  notify() {
    this.leavingGamesModule.next(new Date());
  }
}
