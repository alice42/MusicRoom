import React, { Component } from "react";
import Expo from "expo";
import { Button } from "react-native";
import { Text, View } from "react-native";
import * as loginActions from "../../../actions/loginActions";

class LoginGoogle extends Component {
  onLoginPress = () => {
    this.props.actions.googleLoginRequest();
  };

  render() {
    return <Button onPress={this.onLoginPress} title="Sign Up Via Google" />;
  }
}

export default LoginGoogle;
