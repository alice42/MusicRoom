import { combineReducers } from "redux";
import signUpAppReducer from "./signUpAppReducer";
import loginAppReducer from "./loginAppReducer";
import loginGoogleReducer from "./loginGoogleReducer";
import loginFacebookReducer from "./loginFacebookReducer";

const reducer = combineReducers({
  App: loginAppReducer,
  AppSignUp: signUpAppReducer,
  Google: loginGoogleReducer,
  Facebook: loginFacebookReducer
});
export default reducer;
