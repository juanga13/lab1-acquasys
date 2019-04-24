import {SET_TOKEN} from "../constants/action-types";

export function setToken(token) {
  return { type: SET_TOKEN, token }
}