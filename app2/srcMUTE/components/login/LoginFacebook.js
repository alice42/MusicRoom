import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export default class LoginFacebook extends Component {
  onLoginPress = () => {
    this.props.actions.facebookLoginRequest();
  };

  render() {
    return (
      <Button
        style={styles.button}
        icon={{ name: "facebook", type: "font-awesome" }}
        onPress={this.onLoginPress}
        title="Sign In Via Facebook"
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15
  }
});
