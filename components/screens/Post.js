/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import RNImagePicker from 'react-native-image-picker';
import Firebase from 'react-native-firebase';

type Props = {};
export default class App extends Component<Props> {
  state = {
    uri: '',
  };

  openPicker = () => {
    RNImagePicker.showImagePicker({}, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      }
      else {
        let source = {uri: res.uri};
        this.setState(source);
      }
    });
  };

  upload = () => {
    Firebase.storage()
      .ref('images/' + new Date().getTime())
      .putFile(this.state.uri, { contentType: 'image/jpeg' })
      .then(({downloadURL}) =>
        Firebase.database()
          .ref('images/' + new Date().getTime())
          .set({
            downloadURL
          })
      )
      .then(() => alert('uploaded'))
      .catch(e => {
        console.log(e);
        alert('error');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.state.uri}} style={styles.image} />

        <TouchableOpacity style={styles.button} onPress={ () => this.openPicker() }>
          <Text>Open</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={ () => this.upload() }>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#EEE',
  },
  button: {
    padding: 20,
  },
});
