import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './components/screens/Home.js';
import Post from './components/screens/Post.js';

export default StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'HOME',
    },
  },
  Post: {
    screen: Post,
    navigationOptions: {
      title: 'POST',
    },
  },
});
