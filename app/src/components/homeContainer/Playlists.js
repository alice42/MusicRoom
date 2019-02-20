import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { colors } from "../../constants/colors";
import styles from "../../styles/containers/HomeContainer";
import RadioInput from "../input/RadioInput";
import RoundedButton from "../button/RoundedButton";
import * as userActions from "../../actions/userActions";
import ListPlaylists from "../list/ListPlaylists";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

export default class HomeContainer extends Component {
  render() {
    return (
      <View style={{ flex: 2 }}>
        <Text style={styles.subHeading}>Your playlists</Text>
        <ScrollView>{this.props.renderPlaylists()}</ScrollView>
        <RoundedButton
          text={"Create a new playlist"}
          textColor={colors.white}
          background={colors.green01}
          border={colors.white}
          icon={
            <View style={{ flexDirection: "row", paddingLeft: 100 }}>
              <Icon
                name="music"
                size={20}
                style={{ color: colors.white, paddingLeft: 5 }}
              />
              <Icon
                name="plus"
                size={20}
                style={{ color: colors.white, paddingLeft: 5 }}
              />
            </View>
          }
          handleOnPress={this.props.handleCreatePlaylistRequest}
        />
      </View>
    );
  }
}
