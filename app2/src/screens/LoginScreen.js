import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Login from "../containers/Login";
import { logout } from "../actions/loginActions";

class LoginScreen extends Component {
  componentWillMount() {
    const {
      isAppAuthenticated,
      isGoogleAuthenticated,
      isFacebookAuthenticated,
      isAppSignUpAuthenticated
    } = this.props;
    if (
      isAppAuthenticated ||
      isGoogleAuthenticated ||
      isFacebookAuthenticated ||
      isAppSignUpAuthenticated
    ) {
      this.props.logout();
    }
  }
  componentDidUpdate = () => {
    const {
      isAppAuthenticated,
      isGoogleAuthenticated,
      isFacebookAuthenticated,
      isAppSignUpAuthenticated
    } = this.props;

    if (
      isAppAuthenticated ||
      isGoogleAuthenticated ||
      isFacebookAuthenticated ||
      isAppSignUpAuthenticated
    ) {
      this.props.navigation.replace("Main");
    }
  };

  render() {
    return (
      <View>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

const mapStateToProps = function(state) {
  const { login } = state;
  return {
    isAppSignUpAuthenticated: login.AppSignUp.isAppAuthenticated,
    isAppAuthenticated: login.App.isAppAuthenticated,
    isGoogleAuthenticated: login.Google.isGoogleAuthenticated,
    isFacebookAuthenticated: login.Facebook.isFacebookAuthenticated
  };
};
const actions = {
  logout
};

export default connect(
  mapStateToProps,
  actions
)(LoginScreen);
