import { combineReducers } from "redux";
import NavReducer from "./navigation";
import userReducer from "./user";

const AppReducer = combineReducers({
  nav: NavReducer,
  user: userReducer
});

export default AppReducer;
