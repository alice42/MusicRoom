import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, StyleSheet, Text, Platform, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";
import RoundedButton from "../components/RoundedButton";
import NavBarButton from "../components/NavBarButton";
import { GoogleSignin } from "react-native-google-signin";
import * as loginActions from "../actions/loginActions";

GoogleSignin.configure();

const transparentHeaderStyle = {
  borderBottomWidth: 0,
  elevation: 0
};

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <NavBarButton
        handleButtonPress={() => navigation.navigate("LogIn")}
        location="right"
        color={colors.white}
        text="Log In"
      />
    ),
    headerTransparent: true
  });

  onLoginFacebookPress = () => {
    this.props.actions.loginFacebookRequest();
  };

  onLoginGooglePress = () => {
    this.props.actions.loginGoogleRequest();
  };

  onCreateAccountPress = () => {
    this.props.navigation.navigate("CreateAccount");
  };

  componentDidUpdate = () => {
    const { isAppAuthenticated } = this.props.login;
    if (isAppAuthenticated) {
      this.props.navigation.navigate("LoggedIn");
    }
  };

  componentDidMount() {
    if (Platform.OS === "android") {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener("url", this.handleOpenURL);
    }
  }
  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }
  handleOpenURL = event => {
    this.navigate(event.url);
  };
  navigate = url => {
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, "");
    const routeName = route.split("/")[0];
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcomeText}>Welcome to Music Room.</Text>
          <RoundedButton
            text="Continue with Facebook"
            textColor={colors.green01}
            background={colors.white}
            icon={
              <Icon
                name="facebook"
                size={20}
                style={styles.networkButtonIcon}
              />
            }
            handleOnPress={this.onLoginFacebookPress}
          />
          <RoundedButton
            text="Continue with Google"
            textColor={colors.green01}
            background={colors.white}
            icon={
              <Icon name="google" size={20} style={styles.networkButtonIcon} />
            }
            handleOnPress={this.onLoginGooglePress}
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            border={colors.white}
            handleOnPress={this.onCreateAccountPress}
          />
        </View>
      </View>
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
    flex: 1,
    display: "flex",
    backgroundColor: colors.green01
  },
  welcomeWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
    padding: 20
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40
  },
  networkButtonIcon: {
    color: colors.green01,
    position: "relative",
    left: 20,
    zIndex: 8
  }
});

export default connect(
  loginAppMapStateToProps,
  LoginActionsMapDispatchToProps
)(LoginScreen);
