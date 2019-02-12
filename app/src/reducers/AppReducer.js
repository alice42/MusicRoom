import { combineReducers } from "redux";
import NavReducer from "./navigation";
import LoginReducer from "./loginAppReducer";
import SigninReducer from "./signinAppReducer";
import UpdateReducer from "./updateReducer";

const AppReducer = combineReducers({
  nav: NavReducer,
  login: LoginReducer,
  signin: SigninReducer,
  update: UpdateReducer
});

export default AppReducer;
