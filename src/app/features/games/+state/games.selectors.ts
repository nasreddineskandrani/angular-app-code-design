import { createSelector } from "@ngrx/store";
import { GamesFeatureKey, GamesState } from './games.reducer';

const selectFeature = (state: GamesState) => state[GamesFeatureKey];

export const getGamesHistoryPerId = (id: string) => createSelector(
    selectFeature,
    (state: any) => state[id].historyData
);
  