import { Action, handleActions } from 'redux-actions';
import { MainState } from 'redux/types';
import * as ActionTypes from '../action-types';
import * as mainStateUpdaters from './main-state-updaters';

const actionHandler = {
  [ActionTypes.SET_ZRX_TOKENS]: mainStateUpdaters.setZrxTokensUpdater,
  [ActionTypes.SET_PLATFORM]: mainStateUpdaters.setPlatformUpdater,
};

export default handleActions<MainState, Action<any>>(actionHandler, mainStateUpdaters.INITIAL_MAIN_STATE);
