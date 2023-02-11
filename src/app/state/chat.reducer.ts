import { createReducer, on } from '@ngrx/store';
import { IMessages } from '../utils/modals/message';
import { sendMessage, clearChats } from './chat.actions';

export const initialState: IMessages[] = [];

export const chatReducer = createReducer(
  initialState,
  on(sendMessage, (state, { userId, cnt }) => [...state, { userId, cnt }]),
  on(clearChats, () => initialState)
);
