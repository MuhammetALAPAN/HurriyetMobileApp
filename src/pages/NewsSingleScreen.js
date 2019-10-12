import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native';

import { Container,
  Header,
  Icon,
} from 'native-base';

import { Actions } from "react-native-router-flux";

import { SliderBox } from 'react-native-image-slider-box';

import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get("window");

export default class NewsSingleScreen extends Component {
  state = {
    news: [],
    newsPicture: [],
    newsDescription: [],
    index: 0,
    screenHeight: 0
  };

  componentDidMount () {
    this.getData();
  }

  getData = async () => {
    
    const { data } = await axios.get("https://api.hurriyet.com.tr/v1/newsphotogalleries?$top=20", {
      params : {"$top": "20"},
      headers : {"apikey": "b0155420c36c40af8afc7d186e5727cb"}})
      const news = data[this.props.index]

      var tempPic = [];
      var tempDesc = [];


      for( var i = 0; i < news.Files.length; i ++) {
        tempPic[i] = news.Files[i].FileUrl;
        tempDesc[i] = news.Files[i].Metadata.Description;
      }

      this.setState({
        news,
        newsPicture: tempPic,
        newsDescription: tempDesc
      })     
  }

  indexChanged = (index) => {
    this.setState({
      index
    })
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight});
  }

  render() {
    const scrollEnabled = this.state.screenHeight > height; 
    return (
      
      <Container >
        <Header transparent>
          <SafeAreaView style = {styles.headerSafeAreaView}>
            <Icon onPress= {() => Actions.pop()} name='arrow-back' />
            <Image 
              resizeMode = "contain"
              style = {styles.headerImage}
              source = {{ uri : "https://2deroj25v8qu2o5mtq1fox5r-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Hurriyet-Logo.jpg"}}
            />
            <Icon style = {{marginRight: 10} } name='more' />
          </SafeAreaView>
        </Header>
        
        <ScrollView 
          style = {{flex: 1, height: "100%"}}
          scrollEnabled = {scrollEnabled}
          onContentSizeChange = {this.onContentSizeChange}
          >
            <View style = {styles.allContainer}>
              <View style = {styles.textContainer}>
                <View>
                  <Text style={styles.textContainerTitle}> {this.state.news.Title} </Text>
                  <Text style={styles.textContainerText}> {this.state.news.Description} </Text>
                </View>
                <Text></Text>
              </View>
              <View style = {styles.imageSliderAndDetail}>
                <View style = {styles.imageSliderView}>
                  <SliderBox 
                    images={this.state.newsPicture}
                    sliderBoxHeight={300}
                    currentImage
                    onCurrentImagePressed={index =>
                      this.indexChanged(index)
                    }
                  />
                </View>
                <Text style = { styles.imageSliderTextView }> {this.state.newsDescription[this.state.index]} </Text>            
              </View>
              </View>
        </ScrollView>
        
      </Container>  
    );
  }
}

const styles = StyleSheet.create({
  allContainer: {
    flex : 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  textContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 50
  },

  imageSliderAndDetail : {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },

  imageSliderView : {
    flex: 4,
    marginBottom: 30
  },

  imageSliderTextView : {
    flex: 2,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10
  },

  textContainerText: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 13
  },

  textContainerTitle: {
    fontFamily: "Roboto_medium",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 8
  },

  image: {
    width: "100%",
    aspectRatio: 3 / 2,
    marginBottom: 60,
  },

  headerImage: {
    width: 140,
    height: 70,
  },

  headerSafeAreaView: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#fc1703',
  }
});
