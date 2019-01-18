import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { connect } from "react-redux";
import { Platform } from "react-native";
import { Button } from "react-native-elements";
import { FontAwesome } from "react-native-vector-icons";
import LoginScreen from "../screens/LoginScreen";
import Profile from "../containers/Profile";
import Home from "../containers/Home";
import Details from "../containers/Details";
import LogoutButton from "../components/navigation/LogoutButton";

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    },
    Details: Details
  },
  {
    initialRouteName: "Profile"
  }
);

Details.navigationOptions = ({ navigation }) => {
  const headerTitle = navigation.state.params.DetailsKind;
  return {
    headerTitle
  };
};

ProfileStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle
  };
};

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

SignedIn.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  let headerRight = null;
  if (routeName === "Profile") {
    headerRight = <LogoutButton />;
  }
  return {
    headerTitle,
    headerRight
  };
};

export const AppNavigator = createStackNavigator(
  {
    LogIn: { screen: LoginScreen },
    Main: { screen: SignedIn }
  },
  {
    initialRouteName: "LogIn"
  }
);

const AppWithNavigationState = ({ dispatch, nav }) => <AppNavigator />;
const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
