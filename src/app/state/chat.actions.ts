import { createAction, props } from '@ngrx/store';

export const sendMessage = createAction(
  '[Chat Message] Send',
  props<{ userId: number; cnt: string }>()
);

export const clearChats = createAction('[Clear Messages] Clear');
