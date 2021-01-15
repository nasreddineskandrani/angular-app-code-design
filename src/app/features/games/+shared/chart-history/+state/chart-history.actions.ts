import { createAction, props } from '@ngrx/store';

export const InitGameHistory = createAction('[Games History] Init data per id', props<{ id: string }>());
export const AddPastGameHistory = createAction('[Games History] Add past data per id', props<{ id: string }>());

export const FetchHistorySuccess = createAction('[Games History] Fetch SUCCESS',
    props<{ id: string, startDate: Date, endDate: Date, data: any[] }>());
export const FetchHistoryError = createAction('[Games History] Fetch ERROR', props<{ id: string, error: any }>());
