import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";

export default class Login extends Component {
  state = {
    email: "user@gmail.com",
    password: "user"
  };

  handleChangeEmail = email => {
    this.setState({ email });
  };

  handleChangePassword = password => {
    this.setState({ password });
  };

  loginEmail = () => {
    const { email, password } = this.state;
    this.props.actions.loginRequest(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { loginApp } = this.props;
    const errorEmail =
      loginApp.errorMessage.email !== "" ? loginApp.errorMessage.email : null;
    const errorPassword =
      loginApp.errorMessage.password !== ""
        ? loginApp.errorMessage.password
        : null;
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={this.handleChangeEmail} value={email} />
        {errorEmail ? (
          <FormValidationMessage>{errorEmail}</FormValidationMessage>
        ) : null}
        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={this.handleChangePassword}
          value={password}
          secureTextEntry={true}
        />
        {errorPassword ? (
          <FormValidationMessage>{errorPassword}</FormValidationMessage>
        ) : null}
        <Button
          style={styles.button}
          title="SUBMIT"
          onPress={this.loginEmail}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginTop: 15
  }
});
