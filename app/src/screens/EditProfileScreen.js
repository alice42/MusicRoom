import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";
import InputField from "../components/input/InputField";
import RoundedButton from "../components/button/RoundedButton";
import RadioInput from "../components/input/RadioInput";

class CreateList extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="md-close" size={30} color={colors.lightBlack} />
      </TouchableOpacity>
    ),
    headerStyle: styles.headerStyle
  });

  handleSaveChanges = () => {
    this.props.navigation.goBack();
  };

  render() {
    const privacyOption = "public";
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.heading}>Edit profile</Text>
            <View style={styles.content}>
              <View style={styles.inputWrapper}>
                <InputField
                  labelText="Title"
                  labelTextSize={16}
                  labelTextWeight="400"
                  labelColor={colors.lightBlack}
                  textColor={colors.lightBlack}
                  placeholder={"test"}
                  defaultValue={"test"}
                  borderBottomColor={colors.gray06}
                  inputType="email"
                  inputStyle={{
                    fontSize: 18,
                    fontWeight: "400",
                    paddingBottom: 30
                  }}
                  onChangeText={this.handleLocationChange}
                  showCheckmark={false}
                  autoFocus
                />
              </View>
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
                      Visible to everyone and included on your public profile.
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
            </View>
          </ScrollView>
          <View style={styles.createButton}>
            <RoundedButton
              text="Save"
              textColor={colors.white}
              textAlign="left"
              background={colors.green01}
              borderColor="transparent"
              iconPosition="left"
              //   disabled={!location}
              //   loading={loading}
              icon={
                <View style={styles.buttonIcon}>
                  <FontAwesomeIcon
                    name="angle-right"
                    color={colors.white}
                    size={30}
                  />
                </View>
              }
              handleOnPress={this.handleSaveChanges}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect()(CreateList);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  content: {
    paddingTop: 50
  },
  closeButton: {
    position: "absolute",
    left: 20,
    zIndex: 9999
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 0
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.lightBlack,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15
  },
  privacyOptions: {
    marginTop: 40
  },
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
  inputWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray06,
    height: 1,
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  createButton: {
    position: "absolute",
    bottom: 0,
    right: 10,
    width: 110
  },
  buttonIcon: {
    position: "absolute",
    right: 0,
    top: "50%",
    marginTop: -16
  }
});
