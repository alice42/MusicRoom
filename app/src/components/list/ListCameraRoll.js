import React, { Component } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { colors } from "../../constants/colors";
import styles from "../../styles/components/list/ListCameraRoll";

export default class ListCameraRoll extends Component {
  renderListings = () => {
    const { photos, selectedPhoto, uri } = this.props;

    return photos.map((photo, index) => (
      <View key={`list-${index}`}>
        <TouchableHighlight
          key={index}
          onPress={() => this.props.handleSelected(photo.node.image.uri)}
          style={
            selectedPhoto && uri === photo.node.image.uri
              ? [{ borderWidth: 5, borderColor: colors.green01 }]
              : null
          }
        >
          <Image
            key={index}
            style={styles.image}
            source={{ uri: photo.node.image.uri }}
          />
        </TouchableHighlight>
      </View>
    ));
  };
  render() {
    return <View style={styles.imageGrid}>{this.renderListings()}</View>;
  }
}
