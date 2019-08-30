import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView from 'react-native-maps'
import { colors } from '../constants/colors'

export default class Map extends Component {
  render() {
    return (
      <View style={{ height: 170 }}>
        <MapView
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.00922 * 2.5,
            longitudeDelta: 0.00421 * 2.5
          }}
          style={styles.map}
          region={this.props.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onMarkerDragEnd={this.props.onMapPress.bind(this)}
        >
          <Icon
            name="ios-remove-circle"
            size={30}
            color={colors.green02}
            onPress={this.props.onPressZoomIn.bind(this)}
          />
          <Icon
            name="ios-add-circle"
            size={30}
            color={colors.green02}
            onPress={this.props.onPressZoomOut.bind(this)}
          />
          <MapView.Circle
            radius={this.props.maxDistance}
            center={{
              latitude: this.props.latitude,
              longitude: this.props.longitude
            }}
            strokeColor={colors.green02}
            fillColor={`rgba(0, 131, 136, 0.5)`}
          />
          <MapView.Marker
            draggable
            coordinate={{
              latitude: this.props.latitude,
              longitude: this.props.longitude
            }}
          />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
