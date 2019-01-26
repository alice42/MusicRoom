import { combineReducers } from "redux";
import NavReducer from "./NavReducer";

const reducer = combineReducers({
  nav: NavReducer
});
export default reducer;
