import { createAction, props } from '@ngrx/store';

export const openModal = createAction('[Common] Open Modal');
export const closeModal = createAction('[Common] Close Modal');
export const addMessage = createAction(
  '[Common] Add Message',
  props<{ message: string }>()
);

export const clearMessage = createAction('[Clear Message]');
