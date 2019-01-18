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
    email: ""
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
    const error = AppSignUp.errorMessage !== "" ? AppSignUp.errorMessage : null;
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={this.handleChangeEmail} />
        {error ? <FormValidationMessage>{error}</FormValidationMessage> : null}
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
