import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  CameraRoll,
  Image,
  Dimensions,
  NativeModules
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";
import { infos } from "../constants/infos";
import InputField from "../components/input/InputField";
import RoundedButton from "../components/button/RoundedButton";
import NextArrowButton from "../components/button/NextArrowButton";
import RadioInput from "../components/input/RadioInput";
import ListCameraRoll from "../components/list/ListCameraRoll";

const { width, height } = Dimensions.get("window");

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
    console.log(this.state.uri);
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
            <Text>Use this picture?</Text>
            <NextArrowButton
              color={colors.white}
              background={colors.green01}
              handleOnPress={this.handleValidation}
            />
          </View>
        ) : (
          <View style={styles.footer}>
            <Text>Choose a picture</Text>
          </View>
        )}
      </View>
    );
  }
}

export default connect()(CameraRollScreen);

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.lightBlack,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    marginBottom: 15
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  content: {
    justifyContent: "center",
    paddingTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 10,
    marginRight: 10
  },
  closeButton: {
    position: "absolute",
    left: 20,
    zIndex: 9999
  },
  buttonTextWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
    color: colors.green01
  },
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
  },
  footer: {
    justifyContent: "center",
    width: width,
    height: 150
  }
});
