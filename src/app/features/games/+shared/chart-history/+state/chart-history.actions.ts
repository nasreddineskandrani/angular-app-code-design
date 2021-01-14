import { createAction, props } from '@ngrx/store';

export const FetchGameHistory = createAction('[Games History] Fetch data per id', props<{ id: string, startDate: Date, endDate: Date }>());

export const FetchHistorySuccess = createAction('[Games History] Fetch SUCCESS', props<{ id: string, data: any[] }>());
export const FetchHistoryError = createAction('[Games History] Fetch ERROR', props<{ id: string }>());
