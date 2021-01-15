import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { ConferencesApiService } from 'src/app/api/conferences-api.service';
import { InitGameHistory, FetchHistoryError, FetchHistorySuccess } from '../../+shared/chart-history/+state/chart-history.actions';

const last10Days = 10;

@Injectable()
export class ConferencesEffects {
    gameHistoryInitEffect$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(InitGameHistory),
        filter(action => {
            return action.id === 'conferences';
        }),
        switchMap(action => {
            const end = new Date();
            const start = new Date(end);
            start.setDate(start.getDate() - last10Days);
            return this.conferencesApiService.get(start, end).pipe(
                map(res => FetchHistorySuccess({
                    id: action.id,
                    startDate: start,
                    endDate: end,
                    data: res
                 })),
                catchError(error => of(FetchHistoryError({ id: '' })))
            );
        })
        );
    });

    constructor(private actions$: Actions, private conferencesApiService: ConferencesApiService) {}
}
