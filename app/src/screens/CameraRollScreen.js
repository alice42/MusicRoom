import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  CameraRoll,
  NativeModules
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../constants/colors";
import { infos } from "../constants/infos";
import NextArrowButton from "../components/button/NextArrowButton";
import ListCameraRoll from "../components/list/ListCameraRoll";
import styles from "../styles/screens/CameraRollScreen";

class CameraRollScreen extends Component {
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

  state = {
    photos: [],
    uri: "",
    selectedPhoto: false
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    CameraRoll.getPhotos({
      first: 20,
      assetType: "Photos"
    }).then(data => {
      if (this._isMounted) {
        this.setState({ photos: data.edges });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderListCameraRoll = () => {
    const { photos, selectedPhoto, uri } = this.state;
    return (
      <ListCameraRoll
        uri={uri}
        photos={photos}
        selectedPhoto={selectedPhoto}
        handleSelected={this.selectImage}
      />
    );
  };

  selectImage = uriSelected => {
    //fetchable image for later
    // NativeModules.ReadImageData.readImage(uri, image => {
    //   this.setState({
    //     selected: image,
    //   });
    // });

    const { uri } = this.state;
    if (uri === uriSelected) {
      this.setState({
        selectedPhoto: false,
        uri: ""
      });
    } else {
      this.setState({
        selectedPhoto: true,
        uri: uriSelected
      });
    }
  };

  handleValidation = () => {
    this.props.navigation.state.params.getSelected(this.state.uri);
    this.props.navigation.goBack();
  };

  render() {
    const { selectedPhoto, uri } = this.state;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Camera Roll</Text>
        <ScrollView>{this.renderListCameraRoll()}</ScrollView>
        {selectedPhoto ? (
          <View style={styles.footer}>
            <Text style={styles.textFooter}>Use this picture?</Text>
            <NextArrowButton
              color={colors.green01}
              background={colors.white}
              handleOnPress={this.handleValidation}
            />
          </View>
        ) : (
          <View style={styles.footer}>
            <Text style={styles.textFooter}>Choose a picture</Text>
          </View>
        )}
      </View>
    );
  }
}

export default connect()(CameraRollScreen);
