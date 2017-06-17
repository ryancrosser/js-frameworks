/* @flow */
import { QUERY_RESULTS_RETREIVED, QUERY_RESULTS_ERROR } from './constants';

export default {
  [QUERY_RESULTS_RETREIVED](state, data) {
    state.data = data;
  },
  [QUERY_RESULTS_ERROR](__state, __errObj) {
    // state.data = payload.data;
  }
};
