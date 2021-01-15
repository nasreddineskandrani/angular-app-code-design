import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SalesApiService } from 'src/app/api/sales-api.service';
import { InitGameHistory, FetchHistoryError, FetchHistorySuccess, AddPastGameHistory } from '../../+shared/chart-history/+state/chart-history.actions';
import { GamesState } from '../../+state/games.reducer';
import { getGamesHistoryDateRange } from '../../+state/games.selectors';
import { UploadedSalesNewData } from './sales.actions';

const last10Days = 10;

@Injectable()
export class SalesEffects {
    gameHistoryInitEffect$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(InitGameHistory),
        filter(action => {
            return action.id === 'sales';
        }),
        switchMap((action) => {
            const end = new Date();
            const start = new Date(end);
            start.setDate(start.getDate() - last10Days);
            return this.salesApiService.get(start, end).pipe(
                map(res => {
                    return FetchHistorySuccess({
                        id: action.id,
                        startDate: start,
                        endDate: end,
                        data: res
                    });
                }),
                catchError(error => of(FetchHistoryError({ id: '', error: '' })))
            );
        })
        );
    });

    gameHistoryAddPastEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AddPastGameHistory),
            filter(action => {
                return action.id === 'sales';
            }),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.pipe(select(getGamesHistoryDateRange(action.id))))
            )),
            switchMap(([action, latest]) => {
                const end = new Date(latest.startDate);
                const start = new Date(end);
                start.setDate(start.getDate() - 180);
                return this.salesApiService.get(start, end).pipe(
                    map(res => {
                        const error = localStorage.getItem('fakeError');
                        if (error) {
                            throw({msg: 'wouahhahaha'});
                        }
                        return FetchHistorySuccess({
                            id: action.id,
                            startDate: start,
                            endDate: latest.endDate,
                            data: res
                        });
                    }),
                    catchError(error => of(FetchHistoryError({ id: '', error: '' })))
                );
            })
        );
    });

    UploadedNewData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UploadedSalesNewData),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.pipe(select(getGamesHistoryDateRange('sales'))))
            )),
            switchMap(([, latest]) => {
                return this.salesApiService.get(latest.startDate, latest.endDate).pipe(
                    map(res => {
                        const error = localStorage.getItem('fakeError');
                        if (error) {
                            throw({msg: 'wouahhahaha'});
                        }
                        return FetchHistorySuccess({
                            id: 'sales',
                            startDate: latest.startDate,
                            endDate: latest.endDate,
                            data: res
                        });
                    }),
                    catchError(error => of(FetchHistoryError({ id: '', error: '' })))
                );
            })
        );
    });

    constructor(private actions$: Actions, private store: Store<GamesState>, private salesApiService: SalesApiService) {}
}
