import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../constants/colors";
import styles from "../../styles/components/button/TagsButtons";

export default class BackgroundButton extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>{this.props.title}</Text>
        <TouchableOpacity
          style={styles.touchable}
          onPress={this.props.onPressDeleteTag}
        >
          <Icon name="close" size={20} style={{ color: colors.white }} />
        </TouchableOpacity>
      </View>
    );
  }
}
