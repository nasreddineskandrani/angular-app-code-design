import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { ConferencesApiService } from 'src/app/api/conferences-api.service';
import { FetchGameHistory, FetchHistoryError, FetchHistorySuccess } from '../../+shared/chart-history/+state/chart-history.actions';

@Injectable()
export class ConferencesEffects {
    gameHistoryInitEffect$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(FetchGameHistory),
        filter(action => {
            return action.id === 'conferences';
        }),
        switchMap(action => {
            return this.conferencesApiService.get(action.startDate, action.endDate).pipe(
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

    constructor(private actions$: Actions, private conferencesApiService: ConferencesApiService) {}
}
