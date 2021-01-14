import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { createReducer, Action } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { FetchHistorySuccess } from '../+shared/chart-history/+state/chart-history.actions';

export const GamesFeatureKey = 'games';

export interface GamesState {
  [id: string]: {
    historyData: any[];
  }
}

export const initialState: GamesState = {
};

const reducer = createReducer(
  initialState,
  on(FetchHistorySuccess, (state, action) => {
    return { 
      ...state,
      [action.id]: {
        ...state[action.id],
        historyData: action.data
      }
    };
  })
);

export function gameReducer(state: GamesState | undefined, action: Action) {
  return reducer(state, action);
}
