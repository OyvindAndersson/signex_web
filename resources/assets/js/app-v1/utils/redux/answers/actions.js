import { createAction } from 'redux-actions';
import { CLEAR_ANSWER, LOAD_ANSWER } from '../constants';
import { createRequestAction } from '../utils/createRequestAction';

import { getAnswer } from './api';

export const clearAnswer = createAction(CLEAR_ANSWER);
export const loadAnswer = createRequestAction(LOAD_ANSWER, getAnswer);
