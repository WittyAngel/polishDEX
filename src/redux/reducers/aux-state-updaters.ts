import { Action } from "redux-actions";
import { AuxState } from "redux/types";

export const INITIAL_AUX_STATE = Object.freeze({
  platformVisible: false,
});

export const setPlatformVisibleUpdater = (state: AuxState, action: Action<any>): AuxState => ({
  ...state,
  platformVisible: action.payload || false,
});
