// import React, { Component } from 'react'
// import { AppRegistry, StyleSheet, Text, View } from 'react-native'
// import MapView from 'react-native-maps'

// export default class Map extends Component {
//   render() {
//     console.log('MAP', this.props)
//     return (
//       <View style={{ height: 170 }}>
//         <MapView
//           initialRegion={{
//             latitude: this.props.latitude,
//             longitude: this.props.longitude,
//             latitudeDelta: 0.00922,
//             longitudeDelta: 0.00421
//           }}
//           style={styles.map}
//           // region={this.props.mapRegion}
//           showsUserLocation={true}
//           followUserLocation={true}
//           // onRegionChange={this.props.onRegionChange.bind(this)}
//           onPress={this.props.onMapPress.bind(this)}
//         >
//           {/* {this.props.latitude && this.props.longitude ? (
//             <MapView.Marker
//               draggable
//               coordinate={{
//                 latitude: this.props.latitude,
//                 longitude: this.props.longitude
//               }}
//             >
//               <MapView.Circle
//                 style={{ position: 'absolute', bottom: 50 }}
//                 center={{
//                   latitude: this.props.latitude,
//                   longitude: this.props.longitude
//                 }}
//                 radius={50}
//               />
//             </MapView.Marker>
//           ) : null} */}
//         </MapView>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject
//   }
// })

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'

export default class Map extends Component {
  render() {
    return (
      <View style={{ height: 170 }}>
        <MapView
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: this.props.latitudeDelta,
            longitudeDelta: this.props.longitudeDelta
          }}
          style={styles.map}
          region={this.props.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onPress={this.props.onMapPress.bind(this)}
        >
          <MapView.Circle
            radius={this.props.maxDistance}
            center={{
              latitude: this.props.latitude,
              longitude: this.props.longitude
            }}
          />
          <MapView.Marker
            draggable
            coordinate={{
              latitude: this.props.latitude,
              longitude: this.props.longitude
            }}
            onDragEnd={this.props.onMapPress.bind(this)}
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
