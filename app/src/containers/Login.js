import React, { Component } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import NavigationBar from "react-native-navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../actions/loginActions";
import UserLogin from "../components/user/userLogin";
import UserSignUp from "../components/user/userSignUp";

export default class Login extends Component {
  state = { isDisplaying: false };

  handleDisplayClick = () => {
    this.setState({ isDisplaying: !this.state.isDisplaying });
  };

  render() {
    const { isDisplaying } = this.state;
    return (
      <View>
        {isDisplaying ? <UserLoginConnected /> : <UserSignUpConnected />}
        <Button
          color="gray"
          title={
            isDisplaying
              ? "Not register yet? Sign Up!"
              : "Already register? Log In!"
          }
          onPress={this.handleDisplayClick}
        />
      </View>
    );
  }
}

//Sign Up props
function UserSignUpMapStateToProps(state) {
  const { user } = state;

  return {
    user
  };
}

function UserSignUpmapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

const UserSignUpConnected = connect(
  UserSignUpMapStateToProps,
  UserSignUpmapDispatchToProps
)(UserSignUp);

//Login props
function UserLoginMapStateToProps(state) {
  const { user } = state;

  return {
    user
  };
}

function UserLoginMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

const UserLoginConnected = connect(
  UserLoginMapStateToProps,
  UserLoginMapDispatchToProps
)(UserLogin);
