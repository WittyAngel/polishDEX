import { DEFAULT_PLATFORM } from "constants/tokens";
import { Action } from "redux-actions";
import { MainState } from "redux/types";

export const INITIAL_MAIN_STATE = Object.freeze({
  zrxTokens: [],
  platform: DEFAULT_PLATFORM,
});

export const setZrxTokensUpdater = (state: MainState, action: Action<any>): MainState => ({
  ...state,
  zrxTokens: action.payload || [],
});

export const setPlatformUpdater = (state: MainState, action: Action<any>): MainState => ({
  ...state,
  platform: action.payload || state.platform,
});

