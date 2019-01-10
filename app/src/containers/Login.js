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
      </View>
    );
  }
}

//APP
//Sign Up
function signUpAppMapStateToProps(state) {
  const { user } = state;
  return {
    user
  };
}

function signUpAppmapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

const SignUpAppConnected = connect(
  signUpAppMapStateToProps,
  signUpAppmapDispatchToProps
)(SignUpApp);

//Login
function loginAppMapStateToProps(state) {
  const { login } = state;

  return {
    loginApp: login.App
  };
}

function loginAppMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

const LoginAppConnected = connect(
  loginAppMapStateToProps,
  loginAppMapDispatchToProps
)(LoginApp);

//GOOGLE
function loginGoogleMapStateToProps(state) {
  const { login } = state;

  return {
    loginGoogle: login.Google
  };
}

function loginGoogleMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

const LoginGoogleConnected = connect(
  loginGoogleMapStateToProps,
  loginGoogleMapDispatchToProps
)(LoginGoogle);

//FACEBOOK
function loginFacebookMapStateToProps(state) {
  const { login } = state;

  return {
    loginFacebook: login.Facebook
  };
}

function loginFacebookMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

const LoginFacebookConnected = connect(
  loginFacebookMapStateToProps,
  loginFacebookMapDispatchToProps
)(LoginFacebook);
