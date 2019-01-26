import { combineReducers } from "redux";
import NavReducer from "./navigation";

const AppReducer = combineReducers({
  nav: NavReducer
});

export default AppReducer;
