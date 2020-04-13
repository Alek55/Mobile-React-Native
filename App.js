import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppLoading } from "expo";
import { Asset } from 'expo-asset';
import { Navigator } from "./navigation";
import { Block } from './components'

const images = [
    require('./assets/images/avatar.png')
]

export default class App extends React.Component {

  state = {
    isLoadingComplete: false
  }

  handleResourcesAsync = async () => {
    const cacheImages = images.map(img => {
      return Asset.fromModule(img).downloadAsync()
    })
    return Promise.all(cacheImages)
  }

  render() {
    if(!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
          <AppLoading
              startAsync={this.handleResourcesAsync()}
              onError={error => console.log(error)}
              onFinish={() => this.setState({isLoadingComplete: true})}
          />
      )
    }
    return (
        <Block white>
          <Navigator />
        </Block>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
