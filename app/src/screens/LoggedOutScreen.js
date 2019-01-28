import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";
import RoundedButton from "../components/RoundedButton";
import NavBarButton from "../components/NavBarButton";
import { LoginButton, AccessToken } from "react-native-fbsdk";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";

GoogleSignin.configure();
class FBLoginButton extends Component {
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile", "email"]}
          onLoginFinished={(error, result) => {
            console.log("LOG RESULT", result);
            if (error) {
              alert("Login failed with error: " + error.message);
            } else if (result.isCancelled) {
              alert("Login was cancelled");
            } else {
              alert(
                "Login was successful with permissions: " +
                  result.grantedPermissions
              );
              AccessToken.getCurrentAccessToken().then(data => {
                dispatch(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => alert("User logged out")}
        />
      </View>
    );
  }
}

// module.exports = FBLoginButton;

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

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  onCreateAccountPress = () => {
    this.props.navigation.navigate("CreateAccount");
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <FBLoginButton />
          <GoogleSigninButton
            style={{ width: 48, height: 48 }}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn}
          />
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
          />
          <RoundedButton
            text="Continue with Google"
            textColor={colors.green01}
            background={colors.white}
            icon={
              <Icon name="google" size={20} style={styles.networkButtonIcon} />
            }
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

export default connect()(LoginScreen);
