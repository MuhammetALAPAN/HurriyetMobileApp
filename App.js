
import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import Root from './src/Root';

export default class app extends Component {
  
  render() {
    return (
      <Root />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
