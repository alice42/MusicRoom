import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { logout } from "../actions/loginActions";
import NavigationBar from "react-native-navbar";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  titleConfig = {
    title: "Home",
    tintColor: "black"
  };

  logoutButtonConfig = {
    title: "Logout",
    handler: () => {
      this.props.logout();
      this.props.navigation.navigate("Main");
    }
  };
  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.titleConfig}
          tintColor="#ADF8D1"
          rightButton={this.logoutButtonConfig}
        />
        <Text>{JSON.stringify(user)}</Text>
        <Text>{JSON.stringify(this.props.nav)}</Text>
        <View style={styles.center} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  input: {
    alignSelf: "center",
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1
  }
});

function mapStateToProps(state) {
  const SignUpByApp = state.login.AppSignUp.isAppAuthenticated;
  const logByApp = state.login.App.isAppAuthenticated;
  const logByGoogle = state.login.Google.isGoogleAuthenticated;
  const logByFacebook = state.login.Facebook.isFacebookAuthenticated;
  if (logByApp) {
    const { user } = state.login.App;
    return {
      user
    };
  }
  if (logByGoogle) {
    const { user } = state.login.Google;
    return {
      user
    };
  }
  if (logByFacebook) {
    const { user } = state.login.Facebook;
    return {
      user
    };
  }
  if (SignUpByApp) {
    const { user } = state.login.AppSignUp;
    return {
      user
    };
  }
}

const actions = {
  logout
};

export default connect(
  mapStateToProps,
  actions
)(HomeScreen);
