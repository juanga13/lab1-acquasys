import {SET_TOKEN} from "../constants/action-types";

const initialState = {
  token: null
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_TOKEN) {
    return Object.assign(
      {},
      state,
      {
          token: state.token.concat(action.token)
      });
  }
  return state;
}

export default rootReducer;