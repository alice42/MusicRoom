import React, { Component } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import NavigationBar from "react-native-navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export default class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: ""
  };

  handleChangeEmail = email => {
    this.setState({ email });
  };

  handleSignUp = () => {
    const { email } = this.state;
    this.props.actions.signUpRequest(email);
  };

  render() {
    const { AppSignUp } = this.props;
    let error;
    if (AppSignUp.errorMessage !== "") {
      error = (
        <Text style={{ backgroundColor: "red" }}>{AppSignUp.errorMessage}</Text>
      );
    }
    return (
      <View>
        {error}
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={this.handleChangeEmail}
        />
        <Button name="envelope-o" title="Sign Up" onPress={this.handleSignUp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: "center",
    height: 44,
    width: 200,
    borderColor: "gray",
    borderWidth: 1
  }
});
