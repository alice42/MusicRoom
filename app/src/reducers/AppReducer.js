import { combineReducers } from "redux";
import NavReducer from "./navigation";
// import LoginReducer from "./loginAppReducer";
// import SigninReducer from "./signinAppReducer";
// import UpdateReducer from "./updateReducer";
import UserReducer from "./userReducer";

const AppReducer = combineReducers({
  nav: NavReducer,
  user: UserReducer
  // login: LoginReducer,
  // signin: SigninReducer,
  // update: UpdateReducer
});

export default AppReducer;
