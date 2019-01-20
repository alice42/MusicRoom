import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";

export default class SignUp extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChangeEmail = email => {
    this.setState({ email });
  };
  handleChangePassword = password => {
    this.setState({ password });
  };

  handleSignUp = () => {
    const { email, password } = this.state;
    this.props.actions.signUpRequest(email, password);
  };

  render() {
    const { AppSignUp } = this.props;
    const errorEmail =
      AppSignUp.errorMessage.email !== "" ? AppSignUp.errorMessage.email : null;
    const errorPassword =
      AppSignUp.errorMessage.password !== ""
        ? AppSignUp.errorMessage.password
        : null;
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={this.handleChangeEmail} />
        {errorEmail ? (
          <FormValidationMessage>{errorEmail}</FormValidationMessage>
        ) : null}
        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={this.handleChangePassword}
          secureTextEntry={true}
        />
        {errorPassword ? (
          <FormValidationMessage>{errorPassword}</FormValidationMessage>
        ) : null}
        <Button
          style={styles.button}
          title="SUBMIT"
          onPress={this.handleSignUp}
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
