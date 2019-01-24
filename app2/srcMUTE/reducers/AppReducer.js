import { combineReducers } from "redux";
import NavReducer from "./navigation";
import loginReducer from "./login";

const AppReducer = combineReducers({
  nav: NavReducer,
  login: loginReducer
});

export default AppReducer;
