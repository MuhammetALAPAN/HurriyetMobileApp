import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl,
  StatusBar
} from 'react-native';

import { Actions } from "react-native-router-flux";

import axios from 'axios';

export default class NewsListScreen extends Component {
  state = {
    news: [],
  };

  componentDidMount () {
    this.getData();
  }

  getData = async () => {
    StatusBar.setBackgroundColor("#fc1703")
    const { data } = await axios.get("https://api.hurriyet.com.tr/v1/newsphotogalleries?$top=20", {
      params : {"$top": "20"},
      headers : {"apikey": "b0155420c36c40af8afc7d186e5727cb"}})
      const news = data;
      this.setState({
          news
      })
  }
  
  refreshGetData = async () => {
    await this.getData();
  }

  _onRefresh = () => {
      this.setState({refreshing: true})
      this.refreshGetData()
      this.setState({refreshing: false})
  }

  renderDataItem = ({item, index}) => {
    StatusBar.setBackgroundColor("#fc1703")
    return (
      <TouchableWithoutFeedback
        onPress = {() => Actions.deneme2({ index })}>
        <View style = {styles.allContainer}>
          <Image
            style = {styles.image}
            source = {{uri : item.Files[0].FileUrl}}
          />
          <View style = {styles.textContainer}>
            <Text style={styles.textContainerTitle}> {item.Title} </Text>
            <Text style={styles.textContainerText}> {item.Description} </Text>
          </View>
          <View style = {styles.border}></View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  
  render() {
    StatusBar.setBackgroundColor("#fc1703")
    return (   
        <FlatList
        renderItem = {this.renderDataItem}
        keyExtractor = {item => item.Id}
        data = {this.state.news}
        refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            />
        }
        />
    );
  }
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 40,
  },

  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#fc1703",
    borderBottomLeftRadius: 16,
    marginLeft: 10,
    marginRight: 10
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 80
  },

  textContainerText: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 13
  },

  textContainerTitle: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
    fontFamily: "Roboto_medium",
    textAlign: "center",
  },

  image: {
    flex: 1,
    alignItems: "stretch",
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 10,
  },
});
