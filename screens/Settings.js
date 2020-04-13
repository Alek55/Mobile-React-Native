import React from 'react';
import { StyleSheet, FlatList, Image, Dimensions, Animated, Modal, ScrollView, TouchableOpacity } from 'react-native';

import { Button, Block, Text } from '../components'
import { theme, mocks } from '../constants'
import Main from "./Main";

class Settings extends React.Component {

    state = {

    }

    render() {
        const { navigation, profile } = this.props
        return (
            <Block padding={[0, theme.sizes.padding * 0]} style={{backgroundColor: '#fff'}}>
                <Block flex={false} row center space='between' style={styles.header}>
                    <Text h1 bold>Настройки</Text>
                    <Button onPress={() => navigation.navigate('Settings')}>
                        <Image source={profile.avatar} style={styles.avatar}/>
                    </Button>
                </Block>
            </Block>
        )
    }
}

Settings.defaultProps = {
    profile: mocks.profile
}

export default Settings

const styles = StyleSheet.create({
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2
    },
})