import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

///

import { ConferencesRoutingModule } from './conferences-routing.module';
import { GamesSharedModule } from '../+shared/games-shared.module';

import { ConferencesComponent } from './conferences.component';
import { HISTORY_API_SERVICE } from '../../../api/i-api.service';
import { ConferencesApiService } from '../../../api/conferences-api.service';
import { EffectsModule } from '@ngrx/effects';
import { ConferencesEffects } from './+state/conferences.effects';

@NgModule({
  imports: [
    CommonModule,
    ConferencesRoutingModule,
    GamesSharedModule,
    EffectsModule.forFeature([ConferencesEffects]),
  ],
  declarations: [ConferencesComponent],
  providers: [
    {
      provide: HISTORY_API_SERVICE,
      useClass: ConferencesApiService
    }
  ]
})
export class ConferencesModule {}
