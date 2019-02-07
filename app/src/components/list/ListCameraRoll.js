import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import { colors } from "../../constants/colors";

const { width, height } = Dimensions.get("window");

export default class editableListings extends Component {
  selectImage = uri => {
    this.props.handleSelected(uri);
  };

  renderListings = () => {
    const { photos, selectedPhoto, uri } = this.props;

    return photos.map((photo, index) => (
      <View key={`list-${index}`}>
        <TouchableHighlight
          key={index}
          onPress={() => this.selectImage(photo.node.image.uri)}
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

const styles = StyleSheet.create({
  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  image: {
    width: width / 4,
    height: width / 4,
    margin: 10
  }
});
