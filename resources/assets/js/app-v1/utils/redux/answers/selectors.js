import { createSelector } from 'reselect';

import { LOAD_ANSWER } from '../constants';
import {
  createHasActiveRequestSelectorFor,
  createFailedRequestSelectorFor,
} from '../requests/selectors';

const answersStoreSelector = state => state.answers;

export const answerSelector = createSelector(
  answersStoreSelector,
  answersStore => answersStore.answer,
);

export const answerImageSelector = createSelector(
  answersStoreSelector,
  answersStore => answersStore.image,
);

export const loadAnswerActiveSelector = createHasActiveRequestSelectorFor(
  LOAD_ANSWER,
);

export const loadAnswerErrorSelector = createFailedRequestSelectorFor(
  LOAD_ANSWER,
);
