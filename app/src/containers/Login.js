import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import NavigationBar from "react-native-navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../actions/loginActions";
import SignUpApp from "../components/login/SignUpApp";
import LoginApp from "../components/login/LoginApp";
import LoginGoogle from "../components/login/LoginGoogle";
import LoginFacebook from "../components/login/LoginFacebook";
import ResetPassword from "../components/login/ResetPassword";

export default class Login extends Component {
  state = { isRegistred: false };

  handleDisplayClick = () => {
    this.setState({ isRegistred: !this.state.isRegistred });
  };

  render() {
    const { isRegistred } = this.state;
    return (
      <View>
        {isRegistred ? <LoginAppConnected /> : <SignUpAppConnected />}
        <Button
          color="gray"
          title={
            isRegistred
              ? "Not register yet? Sign Up!"
              : "Already register? Log In!"
          }
          onPress={this.handleDisplayClick}
        />
        <LoginGoogleConnected />
        <LoginFacebookConnected />
        <View>
          <ResetPasswordConnected />
        </View>
      </View>
    );
  }
}

//APP
// Login Actions
function LoginActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
//Sign Up
function signUpAppMapStateToProps(state) {
  const { login } = state;
  return {
    AppSignUp: login.AppSignUp
  };
}

const SignUpAppConnected = connect(
  signUpAppMapStateToProps,
  LoginActionsMapDispatchToProps
)(SignUpApp);

//Login
function loginAppMapStateToProps(state) {
  const { login } = state;
  return {
    loginApp: login.App
  };
}

const LoginAppConnected = connect(
  loginAppMapStateToProps,
  LoginActionsMapDispatchToProps
)(LoginApp);

//GOOGLE
function loginGoogleMapStateToProps(state) {
  const { login } = state;

  return {
    loginGoogle: login.Google
  };
}

const LoginGoogleConnected = connect(
  loginGoogleMapStateToProps,
  LoginActionsMapDispatchToProps
)(LoginGoogle);

//FACEBOOK
function loginFacebookMapStateToProps(state) {
  const { login } = state;

  return {
    loginFacebook: login.Facebook
  };
}

const LoginFacebookConnected = connect(
  loginFacebookMapStateToProps,
  LoginActionsMapDispatchToProps
)(LoginFacebook);

// RESET PASSWORD
function ResetPasswordMapStateToProps(state) {
  const { login } = state;
  return {
    resetPassword: login.ResetPassword
  };
}

const ResetPasswordConnected = connect(
  ResetPasswordMapStateToProps,
  LoginActionsMapDispatchToProps
)(ResetPassword);
