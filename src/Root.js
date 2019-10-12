import React, {Component} from 'react';
import { Router, Scene } from "react-native-router-flux";

import NewsListScreen from './pages/NewsListScreen';
import SingleScreen from './pages/NewsSingleScreen';
import testing from './pages/testing';

export default class app extends Component {
    render() {
        return (
            <Router >
                <Scene key = "Root" hideNavBar={true}>
                    <Scene key = "lolol" hideNavBar={true} >
                        <Scene key = "lol" component={testing} title = "lol"  />
                    </Scene>
                    <Scene key = "deneme1" hideNavBar={true} initial >
                        <Scene key = "listScreen" component={NewsListScreen} title = "ListScreen"  />
                    </Scene>
                    <Scene key = "deneme2" hideNavBar={true} >
                        <Scene key = "singleScreen" component={SingleScreen} title = "SingleScreen" hideNavBar = {true} />
                    </Scene>
                </Scene>
            </Router>
        )
    }
}
  
