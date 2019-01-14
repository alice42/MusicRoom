import React, { Component } from "react";
import { Button } from "react-native";
import { Text, View } from "react-native";

class LoginFacebook extends Component {
  onLoginPress = () => {
    this.props.actions.facebookLoginRequest();
  };

  render() {
    return <Button onPress={this.onLoginPress} title="Sign Up Via Facebook" />;
  }
}

export default LoginFacebook;
