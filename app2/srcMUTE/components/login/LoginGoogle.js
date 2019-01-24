import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export default class LoginGoogle extends Component {
  onLoginPress = () => {
    this.props.actions.googleLoginRequest();
  };

  render() {
    return (
      <Button
        style={styles.button}
        icon={{ name: "google", type: "font-awesome" }}
        onPress={this.onLoginPress}
        title="Sign In Via Google"
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15
  }
});
