import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import HomeContainer from "../containers/HomeContainer";
import SettingsContainer from "../containers/SettingsContainer";
import ProfileContainer from "../containers/ProfileContainer";
import { colors } from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import CameraRollScreen from "../screens/CameraRollScreen";
import CreatePlaylist from "../screens/CreatePlaylistScreen";
import AllPlaylists from "../screens/AllPlaylistsScreen";
import Playlist from "../screens/PlaylistScreen";

const HomeTab = createStackNavigator({
  HomeContainer: {
    screen: HomeContainer,
    navigationOptions: {
      header: null
    }
  },
  CreatePlaylist: { screen: CreatePlaylist },
  AllPlaylists: { screen: AllPlaylists },
  Playlist: { screen: Playlist }
});

HomeTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const ProfileTab = createStackNavigator(
  {
    ProfileContainer: {
      screen: ProfileContainer,
      navigationOptions: {
        header: null
      }
    },
    CameraRoll: { screen: CameraRollScreen }
  },
  {
    mode: "modal"
  }
);

ProfileTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const CustomTabBarIcon = (name, size) => {
  const icon = ({ tintColor }) => (
    <Icon name={name} size={size} color={tintColor} />
  );

  return icon;
};

const LoggedInTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeTab,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: CustomTabBarIcon("home", 22)
      }
    },
    Profile: {
      screen: ProfileTab,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: CustomTabBarIcon("user", 22)
      }
    },
    Settings: {
      screen: SettingsContainer,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: CustomTabBarIcon("cogs", 22)
      }
    }
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontWeight: "600",
        marginBottom: 5
      },
      activeTintColor: colors.green01
    },
    tabBarPosition: "bottom"
  }
);

export default LoggedInTabNavigator;
