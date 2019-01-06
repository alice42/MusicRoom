import React from "react";
import {
  addNavigationHelpers,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { createStore, combineReducers } from "redux";
import { connect } from "react-redux";
import { Platform } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import Test from "../screens/Test";

import TabBarIcon from "../components/navigation/TabBarIcon";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const TestStack = createStackNavigator({
  Test: Test
});

TestStack.navigationOptions = {
  tabBarLabel: "Test",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const TabNav = createBottomTabNavigator({
  HomeStack,
  TestStack
});

export const AppNavigator = createStackNavigator(
  {
    Main: { screen: LoginScreen },
    Home: { screen: TabNav }
  },
  {
    initialRouteName: "Main"
  }
);

const AppWithNavigationState = ({ dispatch, nav }) => <AppNavigator />;
const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
