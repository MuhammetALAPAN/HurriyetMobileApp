import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import FlatListExample from './FlatListExample';

const FirstRoute = () => (
  <FlatListExample/>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Top Stories' },
      { key: 'second', title: 'For You' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'red' }}
              style={{ backgroundColor: 'white' }}
              labelStyle = {{color: "red"}}
              
            />
        }
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />

      
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});