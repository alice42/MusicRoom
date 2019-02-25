import { combineReducers } from "redux";
import NavReducer from "./navigation";
import searchReducer from "./searchReducer";
import UserReducer from "./userReducer";

const AppReducer = combineReducers({
  nav: NavReducer,
  user: UserReducer,
  search: searchReducer
});

export default AppReducer;
