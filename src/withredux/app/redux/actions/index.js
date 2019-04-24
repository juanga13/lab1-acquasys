import { SET_TOKEN_DATA } from "../constants/action-types";

export function setTokenData(token, role) {
  return { type: SET_TOKEN_DATA, token, role }
}
