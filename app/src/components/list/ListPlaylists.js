import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { colors } from "../../constants/colors";

export default class Listings extends Component {
  handleOnPress = listing => {
    this.props.navigation.navigate("Playlist");
  };

  renderListings() {
    const { list } = this.props;
    return list.map((listing, index) => (
      <TouchableOpacity
        key={`listing-${index}`}
        style={{ marginTop: 10 }}
        onPress={() => this.handleOnPress(listing)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.listingTitle}>{listing.name}</Text>
            <Text style={styles.listingPrivacy}>{listing.privacy}</Text>
            <Text style={styles.listingTitle}>{listing.artist}</Text>
          </View>
          <View>
            {listing.date ? (
              <Text style={styles.listingDate}>
                {listing.date.toLocaleString()}
              </Text>
            ) : null}
          </View>
          <Icon
            name={"chevron-right"}
            size={20}
            style={{ color: colors.green01 }}
          />
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>{this.renderListings()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex"
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray04,
    marginTop: 2
  },
  listingPrivacy: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.lightGray,
    marginTop: 4,
    marginLeft: 5
  },
  listingDate: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.green01,
    marginTop: 2
  }
});
