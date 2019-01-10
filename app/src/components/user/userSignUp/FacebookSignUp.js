import React, { Component } from "react";
import Expo from "expo";
import { Button } from "react-native";
import { Text, View } from "react-native";
import * as loginActions from "../../../actions/loginActions";

class LoginFacebook extends Component {
  onLoginPress = () => {
    console.log("1");
    this.props.actions.facebookLoginRequest();
  };

  render() {
    return <Button onPress={this.onLoginPress} title="Sign Up Via Facebook" />;
  }
}

export default LoginFacebook;
