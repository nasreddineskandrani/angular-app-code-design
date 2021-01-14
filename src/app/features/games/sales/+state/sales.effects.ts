import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { SalesApiService } from 'src/app/api/sales-api.service';
import { FetchGameHistory, FetchHistoryError, FetchHistorySuccess } from '../../+shared/chart-history/+state/chart-history.actions';

@Injectable()
export class SalesEffects {
    gameHistoryInitEffect$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(FetchGameHistory),
        filter(action => {
            return action.id === 'sales';
        }),
        switchMap(action => {
            return this.salesApiService.get(action.startDate, action.endDate).pipe(
                map(res => FetchHistorySuccess({
                    id: action.id,
                    startDate: action.startDate,
                    endDate: action.endDate,
                    data: res
                })),
                catchError(error => of(FetchHistoryError({ id: '' })))
            );
        })
        );
    });

    constructor(private actions$: Actions, private salesApiService: SalesApiService) {}
}
