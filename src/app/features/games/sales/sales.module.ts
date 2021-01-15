import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

///

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { SalesUploadComponent } from './sales-upload/sales-upload.component';
import { GamesSharedModule } from '../+shared/games-shared.module';
import { SalesApiService } from '../../../api/sales-api.service';
import { HISTORY_API_SERVICE } from '../../../api/i-api.service';
import { EffectsModule } from '@ngrx/effects';
import { SalesEffects } from './+state/sales.effects';

@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule,
    GamesSharedModule,
    EffectsModule.forFeature([SalesEffects]),
  ],
  declarations: [SalesUploadComponent, SalesComponent],
  providers: [
    {
      provide: HISTORY_API_SERVICE,
      useClass: SalesApiService
    }
  ]
})
export class SalesModule {}
