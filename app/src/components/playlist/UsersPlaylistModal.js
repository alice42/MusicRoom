// import React from 'react'
// import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, FlatList, SwipeRow, Image } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import { colors } from '../../constants/colors'

// const { width, height } = Dimensions.get('window')

// export default class UsersPlaylistModal extends React.Component {
//   state = {
//     modalVisible: false
//   }

//   setModalVisible = visible => {
//     this.setState({ modalVisible: visible })
//     this.props.handleFollowers()
//   }

//   render() {
//     const { followers } = this.props.user.data
//     return (
//       <View>
//         <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
//           <View style={styleModal.modal}>
//             <View style={styleModal.modalContent}>
//               <TouchableOpacity
//                 onPress={() => {
//                   this.setModalVisible(false)
//                 }}
//               >
//                 <Icon style={{ marginLeft: 10 }} name="close" size={30} color={colors.lightBlack} />
//               </TouchableOpacity>
//               <View style={{ marginTop: 30, marginLeft: 10 }}>
//                 <Text style={{ color: 'black' }}>Users Rights</Text>
//               </View>
//               <View style={{ marginTop: 20 }}>
//                 {followers ? (
//                   <FlatList
//                     data={followers}
//                     ItemSeparatorComponent={() => {
//                       return <View />
//                     }}
//                     keyExtractor={item => {
//                       return `${item.id}`
//                     }}
//                     renderItem={item => {
//                       const follower = item.item
//                       return (
//                         <View>
//                           <View
//                             style={{
//                               backgroundColor: item.index % 2 ? colors.green02 : colors.green01,
//                               flexDirection: 'row',
//                               borderBottomWidth: 1,
//                               borderBottomStyle: 'solid',
//                               borderBottomColor: 'black',
//                               paddingLeft: 20
//                             }}
//                           >
//                             <View style={styles.container}>
//                               <Image
//                                 style={styles.image}
//                                 source={
//                                   follower.picture
//                                     ? {
//                                         uri: `${follower.picture}`
//                                       }
//                                     : null
//                                 }
//                               />
//                             </View>
//                             <View style={{ justifyContent: 'center', width: width - 200 }}>
//                               <Text style={styles.trackTitle}>{follower.name}</Text>
//                             </View>
//                             <View
//                               style={{
//                                 flexDirection: 'row',
//                                 justifyContent: 'space-between'
//                               }}
//                             >
//                               <TouchableOpacity
//                                 // onPress={() => this.props.ChangeRightSee()}
//                                 style={{
//                                   justifyContent: 'center'
//                                 }}
//                               >
//                                 <Icon
//                                   name="eye"
//                                   size={18}
//                                   style={{
//                                     color: colors.white,
//                                     marginRight: 20
//                                   }}
//                                 />
//                               </TouchableOpacity>
//                               <TouchableOpacity
//                                 // onPress={() => this.props.ChangeRightSeeEdit()}
//                                 style={{
//                                   justifyContent: 'center'
//                                 }}
//                               >
//                                 <Icon
//                                   name="edit"
//                                   size={18}
//                                   style={{
//                                     color: colors.white,
//                                     marginRight: 20
//                                   }}
//                                 />
//                               </TouchableOpacity>
//                             </View>
//                           </View>
//                         </View>
//                       )
//                     }}
//                   />
//                 ) : null}
//               </View>
//             </View>
//           </View>
//         </Modal>

//         <TouchableOpacity
//           onPress={() => {
//             this.setModalVisible(true)
//           }}
//         >
//           <Icon style={{ marginRight: 20 }} name="users" size={20} />
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }

// const styleModal = StyleSheet.create({
//   modal: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 80,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)'
//   },
//   modalContent: {
//     backgroundColor: colors.white,
//     width: width,
//     height: height,
//     display: 'flex'
//   }
// })

// const styles = StyleSheet.create({
//   root: {
//     backgroundColor: '#ffffff',
//     marginTop: 10
//   },
//   container: {
//     paddingLeft: 19,
//     paddingRight: 16,
//     paddingVertical: 12,
//     flexDirection: 'row',
//     alignItems: 'flex-start'
//   },
//   content: {
//     marginLeft: 16,
//     flexDirection: 'row',
//     flex: 1
//   },
//   playlistTitle: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: colors.gray04,
//     marginTop: 2
//   },
//   contentHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6
//   },
//   separator: {
//     height: 1,
//     backgroundColor: colors.gray04
//   },
//   image: {
//     width: 45,
//     height: 45,
//     borderRadius: 20,
//     marginLeft: 20
//   },
//   time: {
//     fontSize: 11,
//     color: '#808080'
//   },
//   playlistPrivacy: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: colors.lightGray,
//     marginTop: 4,
//     marginLeft: 5
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   standaloneRowBack: {
//     alignItems: 'center',
//     backgroundColor: colors.darkOrange,
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingRight: 20
//   },
//   backTextWhite: {
//     color: '#FFF'
//   }
// })
