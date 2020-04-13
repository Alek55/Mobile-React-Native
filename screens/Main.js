import React from 'react';
import { StyleSheet, FlatList, Image, Dimensions, Animated, Modal, ScrollView, TouchableOpacity } from 'react-native';
import rgba from 'hex-to-rgba'
import Icon from 'react-native-vector-icons/AntDesign'
import { AnimatedCircularProgress  } from "react-native-circular-progress"

import { Button, Block, Text, Badge, Card } from '../components'
import { theme, mocks } from '../constants'
import {BoxShadow} from "react-native-shadow";

const {width} = Dimensions.get('window')
const shadowOpt = {
    width: 150,
    height:150,
    color:"#EBEAE8",
    border:0,
    radius:15,
    opacity:0.2,
    x:-10,
    y:-10,
    style:{
        marginVertical:10,
        marginHorizontal: 10
    }
}

class Main extends React.Component {

    state = {
        active: 'Сегодня'
    }

    renderTab(tab) {
        const { active } = this.state
        const isActive = active === tab

        return (
            <TouchableOpacity
                key={`tab-${tab}`}
                onPress={() => this.setState({active: tab})}
                style={[
                    styles.tab,
                    isActive ? styles.active : null
                ]}
            >
                <Text size={16} medium gray={!isActive} secondary={isActive}>{tab}</Text>
            </TouchableOpacity>
        )
    }

    renderCardData = item => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {}}
            >
                <BoxShadow setting={shadowOpt}>
                    <Card shadow style={styles.card}>
                        <Image source={item.icon} style={styles.cardIcon} resizeMode="contain" />
                        <Text transform="capitalize" title>{item.title}</Text>
                    </Card>
                </BoxShadow>
            </TouchableOpacity>
        )
    }

    renderBottomButton() {
        return (
            <Block center middle style={styles.startTrip}>
                <Badge color={rgba(theme.colors.primary, '0.1')} size={100}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Badge color={theme.colors.primary} size={48}>
                            <Icon name="plus" size={48 / 2} color="white" />
                        </Badge>
                    </TouchableOpacity>
                </Badge>
            </Block>
        )
    }

    render() {
        const { navigation, profile, cardData } = this.props
        const tabs = ['Сегодня', 'Месяц', 'Год']
        return (
            <Block style={{backgroundColor: '#fff'}}>
                <Block flex={false} row center space='between' style={styles.header}>
                    <Text h1 bold>Обзор</Text>
                    <Button onPress={() => navigation.navigate('Settings')}>
                        <Image source={profile.avatar} style={styles.avatar}/>
                    </Button>
                </Block>
                <Block flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>
                <Block style={{paddingHorizontal: theme.sizes.base * 2, paddingVertical: theme.sizes.base * 2}}>
                    <AnimatedCircularProgress
                        size={150}
                        width={10}
                        fill={85}
                        tintColor={theme.colors.primary}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={theme.colors.gray3}
                        backgroundWidth={6}
                        arcSweepAngle={280}
                        rotation={220}
                        lineCap="round"
                    >
                        <Block center middle>
                            <Text>text</Text>
                        </Block>
                    </AnimatedCircularProgress>
                </Block>
                <Block>
                    <FlatList
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        scrollEventThrottle={16}
                        style={{ overflow: "visible", paddingHorizontal: 20 }}
                        data={mocks.cardData}
                        keyExtractor={(item, index) => `${item.id}`}
                        renderItem={({ item }) => this.renderCardData(item)}
                    />
                </Block>
                {/*{this.renderBottomButton()}*/}
            </Block>
        )
    }
}

Main.defaultProps = {
    profile: mocks.profile,
    cardData: mocks.cardData
}

export default Main;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2
    },
    tab: {
        marginRight: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3
    },
    tabs: {
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2
    },
    startTrip: {
        position: 'absolute',
        right: 10,
        bottom: -30,
        width: width,
        zIndex: 20
    },
    card: {
        // marginRight: theme.sizes.base,
        // width: width / 2.7,
        width: 130,
        height: 130,
        borderRadius: 10
    },
    cardIcon: {
        height: 46,
        marginBottom: 10,
    }
});