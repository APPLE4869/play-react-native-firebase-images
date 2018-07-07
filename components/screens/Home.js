import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Firebase from 'react-native-firebase';

type Props = {};
export default class Home extends React.Component<Props> {
  state = {
    data: []
  }

  _keyExtractor = (item, index) => item;

  componentDidMount() {
    Firebase.database()
      .ref('images')
      .on('value', d => {
        this.setState({
          data: Object.values(d.toJSON()).map(({downloadURL}) => downloadURL)
        });
      });
  }

  render () {
    return (
        <View style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            keyExtractor={this._keyExtractor}
            data={this.state.data}
            renderItem={({item}) => (
              <Image source={{ uri: item }} style={{height: 200, width: '100%'}} />
            )}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Post')}
            style={{position: 'absolute', right: 20, bottom: 20, width: 80, height: 80, borderRadius: 40, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center'}}
          >
            <Text style={{color: '#FFF'}}>New</Text>
          </TouchableOpacity>
        </View>
    );
  };
}
