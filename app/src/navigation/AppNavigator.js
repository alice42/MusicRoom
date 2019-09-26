import React from "react";
import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";
import LoggedOutScreen from "../screens/LoggedOutScreen";
import LogInScreen from "../screens/LogInScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import LoggedInNavigator from "./LoggedInNavigator";

export const AppNavigator = createStackNavigator({
  LoggedOut: { screen: LoggedOutScreen },
  LoggedIn: {
    screen: LoggedInNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  CreateAccount: { screen: CreateAccountScreen },
  LogIn: { screen: LogInScreen },
  ForgotPassword: { screen: ForgotPasswordScreen }
});

const AppWithNavigationState = () => <AppNavigator />;
const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
