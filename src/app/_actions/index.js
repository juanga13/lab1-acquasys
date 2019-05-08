import { SET_TOKEN_DATA } from "../_constants/action-types";

export function setTokenData(token, role) {
  return { type: SET_TOKEN_DATA, token, role }
}
