import React from "react";
import { View, Text, StyleSheet } from "react-native";
import deezerManager from "../../../services/deezerService";
import Icon from "react-native-vector-icons/FontAwesome";
import NetworkLinking from "../../link/NetworkLinking";
import RoundedButton from "../../button/RoundedButton";
import PrivacyModal from "./PrivacyModal";
import UserInfos from "./UserInfos";
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
    return (
      <View>
        <View style={styles.contentProfileTitleWrapper}>
          <Text style={styles.contentProfileText}>Your infos</Text>
          <PrivacyModal />
        </View>
        <View style={styles.contentProfileWrapper}>
          <UserInfos
            user={this.props.update.user}
            actions={this.props.actions}
          />
        </View>
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
            text="Link "
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
