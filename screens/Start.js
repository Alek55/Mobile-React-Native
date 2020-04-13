import React from 'react';
import { StyleSheet, FlatList, Image, Dimensions, Animated, Modal, ScrollView } from 'react-native';

import { Button, Block, Text } from '../components'
import { theme } from '../constants'

const {width, height} = Dimensions.get('window')

class Start extends React.Component {

    static navigationOptions = {
        header: null
    }

    scrollX = new Animated.Value(0)

    state = {
        showTerms: false
    }

    renderTermService() {
        return (
            <Modal animationType='slide' visible={this.state.showTerms}>
                <Block space='between' padding={[theme.sizes.padding * 2, theme.sizes.padding]}>
                    <Text h2 light>Соглашение</Text>
                    <ScrollView style={{paddingVertical: theme.sizes.padding}}>
                        <Text caption gray height={18}>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</Text>
                        <Text caption gray height={18}>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</Text>
                        <Text caption gray height={18}>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</Text>
                        <Text caption gray height={18}>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</Text>
                    </ScrollView>
                    <Button gradient onPress={() => this.setState({showTerms: false})}>
                        <Text center white>Я согласен</Text>
                    </Button>
                </Block>
            </Modal>
        )
    }

    renderIllustrations() {
        const {illustrations} = this.props
        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={illustrations}
                extraDate={this.state}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({item}) => (
                    <Image source={item.source} resizeMode="contain" style={{width, overflow: 'visible', height: height / 2}} />
                )}
                onScroll={
                    Animated.event([{
                        nativeEvent: {contentOffset: {x: this.scrollX}}
                    }])
                }
            />
        )
    }

    renderSteps() {
        const {illustrations} = this.props
        const stepPosition = Animated.divide(this.scrollX, width);
        return (
            <Block row center middle style={styles.stepsContainer}>
                {illustrations.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp'
                    })
                    return (
                        <Block animated flex={false} key={`step-${index}`} color='gray' style={[styles.steps, {opacity}]} />
                    )
                })}
            </Block>
        )
    }

    render() {
        const { navigation } = this.props
        return (
            <Block>
                <Block center middle flex={0.5}>
                    <Text h1 primary center bold>Bia.</Text>
                    <Text h2 bold> Контролируй свои расходы.</Text>
                    <Text h4 gray style={{marginTop: theme.sizes.padding}}>Авторизуйтесь чтобы начать!</Text>
                </Block>
                <Block center middle>
                    {this.renderIllustrations()}
                    {this.renderSteps()}
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient onPress={() => navigation.navigate('Login')}><Text center semibold white>Войти</Text></Button>
                    <Button shadow onPress={() => navigation.navigate('Signup')}><Text center semibold>Зарегистрироваться</Text></Button>
                    <Button style={{backgroundColor: 'transparent'}} onPress={() => this.setState({showTerms: true})}><Text center caption gray>Соглашение</Text></Button>
                </Block>
                {this.renderTermService()}
            </Block>
        )
    }
}

Start.defaultProps = {
    illustrations: [
        {
            id: 1,
            source: require('../assets/images/illustration_1.png'),
        },
        {
            id: 2,
            source: require('../assets/images/illustration_2.png'),
        },
        {
            id: 3,
            source: require('../assets/images/illustration_3.png'),
        },
    ]
}

export default Start;

const styles = StyleSheet.create({
    stepsContainer: {
        position: 'absolute',
        bottom: theme.sizes.base * 3,
        right: 0,
        left: 0
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5
    }
});