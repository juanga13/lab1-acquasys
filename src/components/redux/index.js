import store from './store/index';
import { setToken } from "./actions/index";

window.store = store;
window.setToken = setToken;