import { combineReducers } from "redux";
import userReducer from "./userReducer";
import counterReducer from "./counterReducer";
import googleReducer from "./googleSignUpReducer";
import facebookReducer from "./facebookSignUpReducer";

const reducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
  google: googleReducer,
  facebook: facebookReducer
});
export default reducer;
