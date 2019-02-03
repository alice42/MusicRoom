import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import NavBarButton from "../components/NavBarButton";
import InputField from "../components/InputField";
import NextArrowButton from "../components/NextArrowButton";
import * as loginActions from "../actions/loginActions";

class LogIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <NavBarButton
        handleButtonPress={() => navigation.goBack()}
        location="left"
        icon={<Icon name="angle-left" color={colors.green01} size={30} />}
      />
    ),
    headerTransparent: true
  });

  state = {
    token: "",
    password: "",
    passwordConfirm: ""
  };

  // componentDidMount() {
  //   if (Platform.OS === "android") {
  //     Linking.getInitialURL().then(url => {
  //       this.navigate(url);
  //     });
  //   } else {
  //     Linking.addEventListener("url", this.handleOpenURL);
  //   }
  // }
  // componentWillUnmount() {
  //   Linking.removeEventListener("url", this.handleOpenURL);
  // }
  // handleOpenURL = event => {
  //   this.navigate(event.url);
  // };
  // navigate = url => {
  //   const { navigate } = this.props.navigation;
  //   const route = url.replace(/.*?:\/\//g, "");
  //   const routeName = route.split("/")[0];
  //  const token = route.match(/\/([^\/]+)\/?$/)[1];
  //  this.setState({ token });
  // };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handlePasswordConfirmChange = passwordConfirm => {
    this.setState({ passwordConfirm });
  };

  onValidPress = () => {
    const { password, passwordConfirm, token } = this.state;
    if (password === passwordConfirm) {
      this.props.actions.resetPasswordRequest(password, passwordConfirm, token);
    } else {
      return <Text>Error</Text>;
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.logInWrapper}>
          <Text style={styles.loginHeader}>Reset password</Text>
          <InputField
            labelText="NEW PASSWORD"
            onChangeText={this.handlePasswordChange}
          />
          <InputField
            labelText="CONFIRM NEW PASSWORD"
            onChangeText={this.handlePasswordConfirmChange}
          />
          <NextArrowButton handleOnPress={this.onValidPress} />
        </View>

        <View />
      </KeyboardAvoidingView>
    );
  }
}
function LoginActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
function loginAppMapStateToProps(state) {
  const { login } = state;
  return {
    login: login
  };
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.green01
  },
  logInWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
    padding: 20
  },
  loginHeader: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40
  }
});

export default connect(
  loginAppMapStateToProps,
  LoginActionsMapDispatchToProps
)(LogIn);