import { Action, handleActions } from 'redux-actions';
import { AuxState } from 'redux/types';
import * as ActionTypes from '../action-types';
import * as auxStateUpdaters from './aux-state-updaters';

const actionHandler = {
  [ActionTypes.SET_PLATFORM_VISIBLE]: auxStateUpdaters.setPlatformVisibleUpdater,
};

export default handleActions<AuxState, Action<any>>(actionHandler, auxStateUpdaters.INITIAL_AUX_STATE);
