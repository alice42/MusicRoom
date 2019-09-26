import { AppNavigator } from "../../navigation/AppNavigator";

const router = AppNavigator.router;
const mainNavAction = router.getActionForPathAndParams("LoggedOut");
const initialNavState = router.getStateForAction(mainNavAction);

const NavReducer = (state = initialNavState, action) => {
  return router.getStateForAction(action, state);
};

export default NavReducer;
