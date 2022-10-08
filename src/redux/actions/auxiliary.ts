import { createAction } from 'redux-actions';
import * as ActionTypes from 'redux/action-types';

export const setPlatformVisible = createAction<boolean, boolean>(ActionTypes.SET_PLATFORM_VISIBLE, payload => payload);