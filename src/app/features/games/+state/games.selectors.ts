import { createSelector } from '@ngrx/store';
import { GamesFeatureKey, GamesState } from './games.reducer';

const selectFeature = (state: GamesState) => state[GamesFeatureKey];

export const getGamesHistoryPerId = (id: string) => createSelector(
    selectFeature,
    (state: any) => state[id] ? state[id].historyData : undefined
);


export const getGamesHistorStartDate = (id: string) => createSelector(
    selectFeature,
    (state: any) => state[id] ? { startDate: state[id].startDate, endDate: state[id].endDate } : undefined
);