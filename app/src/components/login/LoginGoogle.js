import React, { Component } from "react";
import { Button } from "react-native";
import { Text, View } from "react-native";

class LoginGoogle extends Component {
  onLoginPress = () => {
    this.props.actions.googleLoginRequest();
  };

  render() {
    return <Button onPress={this.onLoginPress} title="Sign Up Via Google" />;
  }
}

export default LoginGoogle;
