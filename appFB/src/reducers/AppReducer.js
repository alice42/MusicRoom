import { combineReducers } from "redux";
import NavReducer from "./navigation";
import LoginReducer from "./loginAppReducer";
import SigninReducer from "./signinAppReducer";

const AppReducer = combineReducers({
  nav: NavReducer,
  login: LoginReducer,
  signin: SigninReducer
});

export default AppReducer;
