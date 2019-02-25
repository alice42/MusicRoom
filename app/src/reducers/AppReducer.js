import { combineReducers } from "redux";
import NavReducer from "./navigation";
// import LoginReducer from "./loginAppReducer";
// import SigninReducer from "./signinAppReducer";
import searchReducer from "./searchReducer";
import UserReducer from "./userReducer";

const AppReducer = combineReducers({
  nav: NavReducer,
  user: UserReducer,
  search: searchReducer
  // signin: SigninReducer,
  // update: UpdateReducer
});

export default AppReducer;
