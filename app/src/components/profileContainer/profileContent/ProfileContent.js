import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UserInfos from "./UserInfos";
import Tags from "./Tags";
import Networks from "./Networks";
import { colors } from "../../../constants/colors";
import styles from "../../../styles/containers/ProfileContainer";

export default class ProfileContent extends React.Component {
  apiError = () => {
    const { error } = this.props.user;
    return <Text style={styles.errorMessage}>{error}</Text>;
  };
  render() {
    return (
      <View>
        {this.apiError()}
        <UserInfos {...this.props} />
        <Tags {...this.props} />
        <Networks {...this.props} />
      </View>
    );
  }
}
