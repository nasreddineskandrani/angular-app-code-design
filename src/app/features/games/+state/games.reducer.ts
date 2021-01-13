import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { createReducer, Action } from '@ngrx/store';
import { environment } from 'src/environments/environment';

export const FeatureKey = 'games';

export interface State {
  data: any[];
}

export const initialState: State = {
  data: []
};

const reducer = createReducer(
  initialState,
);

export function gameReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
