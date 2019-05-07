import store from './store/index';
import { setTokenData } from "./actions/index";

window.store = store;
window.setToken = setTokenData;