import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
///

import { GamesRoutingModule } from './games-routing.module';
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
  providers: []
})
export class GamesModule {}
