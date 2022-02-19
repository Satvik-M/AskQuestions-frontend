import { createReducer, on } from '@ngrx/store';
import * as CommonActions from './common.action';

export interface State {
  modal: boolean;
}

const initialState: State = {
  modal: false,
};

const _commonReducer = createReducer(
  initialState,
  on(CommonActions.openModal, (state) => {
    return { ...state, modal: true };
  }),
  on(CommonActions.closeModal, (state) => {
    return { ...state, modal: false };
  })
);

export function CommonReducer(state, action) {
  return _commonReducer(state, action);
}
