import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import * as ActionTypes from 'redux/action-types';
import { ZrxToken, RootState } from 'redux/types';
import { getTokenListZrx } from 'api';
import { Platform } from 'constants/tokens';

export const setZrxTokens = createAction<ZrxToken[], ZrxToken[]>(ActionTypes.SET_ZRX_TOKENS, payload => payload);
export const setPlatform = createAction<Platform, Platform>(ActionTypes.SET_PLATFORM, payload => payload);

export const readZrxTokens = (refresh = false): ThunkAction<void, RootState, unknown, Action<any>> => {
  return async (dispatch, getState) => {
    const { zrxTokens } = getState().main;

    if (zrxTokens.length && !refresh) {
      return false;
    }

    try {
      const tokens = await getTokenListZrx();
      return dispatch(setZrxTokens(tokens));
    } catch (e) {
      console.log(e);
      return false;
    }
  };
};
