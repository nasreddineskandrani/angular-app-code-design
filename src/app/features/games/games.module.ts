import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
///

import { GamesRoutingModule } from "./games-routing.module";
import { GamesService } from "./games.service";
import { StoreModule } from '@ngrx/store';
import * as from from './+state/games.reducer';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    GamesRoutingModule,
    StoreModule.forFeature(from.GamesFeatureKey, from.gameReducer)
  ],
  declarations: [],
  providers: [GamesService]
})
export class GamesModule {}
