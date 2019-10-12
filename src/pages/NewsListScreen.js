import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { Container,
  Header,
  Icon,
} from 'native-base'

import TabViewExample from './TabViewExample';

import SideMenu from 'react-native-side-menu';

import Menu from './Menu';

;

export default class NewsListScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    })


  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    /*

    SideMenu suanlik tab ve list kismi icin bug li bir sekilde calisiyor, header da problem yok.
    listenin render ini direk SideMenunun icine yazinca kasarak da olsa derliyor.
    Muhtemelen liste sidemenu yu blokluyor.
    
    */
    return (
      
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <Container >
          <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fc1703" translucent = {false}/>
          <Header transparent >
            <SafeAreaView style = {styles.headerSafeAreaView}>
              <Icon onPress = {this.toggle} name='menu' />  
              <Image 
                resizeMode = "contain"
                style = {styles.headerImage}
                source = {{ uri : "https://2deroj25v8qu2o5mtq1fox5r-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Hurriyet-Logo.jpg"}}
              />
              <Icon style = {{marginRight: 10} } name='more' />
            </SafeAreaView>
          </Header>

          
          <TabViewExample/>
        </Container>
      </SideMenu>  
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    width: 140,
    height: 70,
  },

  headerSafeAreaView: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },
});
