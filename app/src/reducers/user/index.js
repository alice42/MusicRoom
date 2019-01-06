import { combineReducers } from "redux";
import userReducer from "./userReducer";
import counterReducer from "./counterReducer";

const reducer = combineReducers({
  user: userReducer,
  counter: counterReducer
});
export default reducer;
