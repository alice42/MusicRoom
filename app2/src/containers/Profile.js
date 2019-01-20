import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ListMenu from "../components/profile/ListMenu";
import CardProfile from "../components/profile/CardProfile";

class Profile extends Component {
  render() {
    return (
      <View>
        <CardProfileConnected />
        {/* <ListMenuConnected /> */}
      </View>
    );
  }
}

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

const ListMenuConnected = connect(mapStateToProps)(ListMenu);
const CardProfileConnected = connect(mapStateToProps)(CardProfile);

export default connect(mapStateToProps)(Profile);
