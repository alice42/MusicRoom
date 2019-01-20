import { combineReducers } from "redux";
import signUpAppReducer from "./signUpAppReducer";
import loginAppReducer from "./loginAppReducer";
import loginGoogleReducer from "./loginGoogleReducer";
import loginFacebookReducer from "./loginFacebookReducer";
import resetPasswordReducer from "./resetPasswordReducer";

const reducer = combineReducers({
  App: loginAppReducer,
  AppSignUp: signUpAppReducer,
  Google: loginGoogleReducer,
  Facebook: loginFacebookReducer,
  ResetPassword: resetPasswordReducer
});
export default reducer;
