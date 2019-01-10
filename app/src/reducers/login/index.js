import { combineReducers } from "redux";
import loginAppReducer from "./loginAppReducer";
import loginGoogleReducer from "./loginGoogleReducer";
import loginFacebookReducer from "./loginFacebookReducer";

const reducer = combineReducers({
  App: loginAppReducer,
  Google: loginGoogleReducer,
  Facebook: loginFacebookReducer
});
export default reducer;
