import { createReducer, on } from '@ngrx/store';
import * as CommonActions from './common.action';

export interface State {
  modal: boolean;
  message: string;
}

const initialState: State = {
  modal: false,
  message: '',
};

const _commonReducer = createReducer(
  initialState,
  on(CommonActions.openModal, (state) => {
    return { ...state, modal: true };
  }),
  on(CommonActions.closeModal, (state) => {
    return { ...state, modal: false };
  }),
  on(CommonActions.addMessage, (state, action) => {
    return { ...state, message: action.message };
  }),
  on(CommonActions.clearMessage, (state) => {
    return { ...state, message: '' };
  })
);

export function CommonReducer(state, action) {
  return _commonReducer(state, action);
}
