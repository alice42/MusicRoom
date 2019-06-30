import React, { Component } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import RadioInput from "../input/RadioInput";

export default class Privacy extends Component {
  selectPrivacyOption = privacyOption => {
    this.props.selectPrivacyOption(privacyOption);
  };

  render() {
    const { privacyOption } = this.props;
    return (
      <View style={styles.privacyOptions}>
        <Text style={styles.privacyHeading}>Privacy</Text>
        <TouchableHighlight
          onPress={() => this.selectPrivacyOption("public")}
          style={styles.privacyOptionItem}
          underlayColor={colors.gray01}
        >
          <View>
            <Text style={styles.privacyOptionTitle}>Public</Text>
            <Text style={styles.privacyOptionDescription}>
              Visible to everyone
            </Text>
            <View style={styles.privacyRadioInput}>
              <RadioInput
                backgroundColor={colors.gray07}
                borderColor={colors.gray05}
                selectedBackgroundColor={colors.green01}
                selectedBorderColor={colors.green01}
                iconColor={colors.white}
                selected={privacyOption === "public"}
              />
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.divider} />
        <TouchableHighlight
          onPress={() => this.selectPrivacyOption("private")}
          style={styles.privacyOptionItem}
          underlayColor={colors.gray01}
        >
          <View>
            <Text style={styles.privacyOptionTitle}>Private</Text>
            <Text style={styles.privacyOptionDescription}>
              Visible only to you and any friends you invite.
            </Text>
            <View style={styles.privacyRadioInput}>
              <RadioInput
                backgroundColor={colors.gray07}
                borderColor={colors.gray05}
                selectedBackgroundColor={colors.green01}
                selectedBorderColor={colors.green01}
                iconColor={colors.white}
                selected={privacyOption === "private"}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  privacyHeading: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.lightBlack,
    marginBottom: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  privacyOptionItem: {
    flex: 1,
    padding: 20
  },
  privacyOptionTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.lightBlack
  },
  privacyOptionDescription: {
    fontSize: 14,
    fontWeight: "200",
    color: colors.lightBlack,
    marginTop: 10,
    paddingRight: 90
  },
  privacyRadioInput: {
    position: "absolute",
    top: 0,
    right: 0
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray06,
    height: 1,
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  }
});
