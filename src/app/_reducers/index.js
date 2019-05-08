import { SET_TOKEN_DATA } from "../_constants/action-types";

const initialState = {
  token: null,
  role: null,
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_TOKEN_DATA) {
    return Object.assign(
      {},
      state,
      {
        token: action.token,
        role: action.role,
      });
  }
  return state;
}

export default rootReducer;