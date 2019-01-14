import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import NavigationBar from "react-native-navbar";
import { connect } from "react-redux";
import Login from "../containers/Login";

class LoginScreen extends Component {
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
    )
      this.props.navigation.navigate("Home");
  };

  render() {
    const titleConfig = {
      title: "Login",
      tintColor: "black"
    };

    return (
      <View style={styles.container}>
        <NavigationBar title={titleConfig} tintColor="#ADF8D1" />
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default connect(mapStateToProps)(LoginScreen);
