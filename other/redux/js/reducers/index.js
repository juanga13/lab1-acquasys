// src/js/reducers/action-types.js
import {ADD_ARTICLE} from "../constants/action-types";

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    // using Object.assign and array.concat
    // we dont break the immutable state rule.
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;