import React from "react";
import { View, Text } from "react-native";
import deezerManager from "../../../services/deezerService";
import Icon from "react-native-vector-icons/FontAwesome";
import NetworkLinking from "../../link/NetworkLinking";
import RoundedButton from "../../button/RoundedButton";
import PrivacyModal from "./PrivacyModal";
import { colors } from "../../../constants/colors";
import styles from "../../../styles/containers/ProfileContainer";

export default class ProfileContent extends React.Component {
  onLoginFacebookPress = () => {
    this.props.actions.linkFacebookRequest();
  };

  onLoginGooglePress = () => {
    this.props.actions.linkGoogleRequest();
  };

  handleDispatchToken = token => {
    this.props.actions.deezerGetTokenSuccess(token);
  };

  render() {
    const { facebook, google, deezer } = this.props.user.data;
    return (
      <View>
        <View style={styles.contentProfileTitleWrapper}>
          <Text style={styles.contentProfileText}>Your networks</Text>
          <PrivacyModal />
        </View>
        <View style={styles.contentProfileWrapper}>
          <NetworkLinking
            textColor={colors.green01}
            background={colors.white}
            border={colors.green01}
            onLoginFacebookPress={this.onLoginFacebookPress}
            onLoginGooglePress={this.onLoginGooglePress}
            textFB={facebook ? "Unlink " : "Link "}
            textG={google ? "Unlink " : "Link "}
            privacyButton={true}
          />
          <RoundedButton
            text="Link Deezer"
            textColor={colors.white}
            background={colors.green01}
            border={colors.green01}
            icon={
              <Icon name="music" size={20} style={styles.contentProfileIcon} />
            }
            handleOnPress={() =>
              deezerManager.connect(this.handleDispatchToken)
            }
          />
        </View>
      </View>
    );
  }
}
