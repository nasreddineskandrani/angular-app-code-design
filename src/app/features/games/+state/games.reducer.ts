import {
  on
} from '@ngrx/store';
import { createReducer, Action } from '@ngrx/store';
import { FetchHistorySuccess } from '../+shared/chart-history/+state/chart-history.actions';
import { LeaveGamesPage } from './games.actions';

export const GamesFeatureKey = 'games';

export interface GamesState {
  [id: string]: {
    historyData: any[];
  };
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
        historyData: [...(state[action.id] ? state[action.id].historyData : []), ...action.data],
        startDate: action.startDate,
        endDate: action.endDate
      }
    };
  }),
  on(LeaveGamesPage, (state, action) => {
    return {};
  })
);

export function gameReducer(state: GamesState | undefined, action: Action): GamesState {
  return reducer(state, action);
}
