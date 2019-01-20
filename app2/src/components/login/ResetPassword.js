import React, { Component } from "react";
import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon
} from "react-native-elements";

export default class ResetPassword extends Component {
  state = {
    modalVisible: false,
    email: ""
  };

  handleChangeEmail = email => {
    this.setState({ email });
  };

  setModalVisible = () => {
    if (this.state.modalVisible) {
      this.setState({ modalVisible: false, email: "" });
    } else {
      this.setState({ modalVisible: true });
    }
  };

  submitEmail = () => {
    const { email } = this.state;
    this.props.actions.resetPassword(email);
  };

  render() {
    const { resetPassword } = this.props;
    const error =
      resetPassword.errorMessage !== "" ? resetPassword.errorMessage : null;
    const { failure } = resetPassword;
    if (!failure && failure !== null) {
      this.state.modalVisible = false;
    }
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{ marginTop: 40, marginLeft: 350 }}>
            <Icon
              type="font-awesome"
              name="times"
              onPress={this.setModalVisible}
            />
          </View>

          <View style={styles.container}>
            <FormLabel>Email</FormLabel>
            <FormInput onChangeText={this.handleChangeEmail} />
            <FormValidationMessage>{error}</FormValidationMessage>
            <Button
              style={styles.button}
              title="SUBMIT AND CLOSE"
              onPress={this.submitEmail}
            />
          </View>
        </Modal>
        <Button
          style={styles.button}
          onPress={this.setModalVisible}
          title="Reset Password"
          transparent
          color="#3D6DCC"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15
  },

  container: {
    flex: 1,
    justifyContent: "center"
  }
});
