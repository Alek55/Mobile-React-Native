import React from 'react'
import { Image } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Start from '../screens/Start'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Forgot from '../screens/Forgot'
import Main from '../screens/Main'
import Settings from '../screens/Settings'

import { theme } from '../constants'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Start" screenOptions={{
            headerStyle: {
                height: theme.sizes.base * 6,
                backgroundColor: theme.colors.white,
                borderBottomColor: 'transparent',
                elevation: 0, // for android
            },
            headerTitle: '',
            headerTitleAlign: 'center',
            headerBackImage: () => <Image source={require('../assets/icons/back.png')} />,
            headerBackTitle: null, // for IOS
            headerLeftContainerStyle: {
                alignItems: 'center',
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base
            },
            headerRightContainerStyle: {
                alignItems: 'center',
                paddingRight: theme.sizes.base
            },
        }}>
            <Stack.Screen name="Start" component={Start} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Navigator>
    )
}

const MainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{
            headerStyle: {
                height: theme.sizes.base * 6,
                backgroundColor: theme.colors.white,
                borderBottomColor: 'transparent',
                elevation: 0, // for android
            },
            headerTitle: '',
            headerTitleAlign: 'center',
            headerBackImage: () => <Image source={require('../assets/icons/back.png')} />,
            headerBackTitle: null, // for IOS
            headerLeftContainerStyle: {
                alignItems: 'center',
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base
            },
            headerRightContainerStyle: {
                alignItems: 'center',
                paddingRight: theme.sizes.base
            },
        }}>
            <Stack.Screen name="Main" component={Main}/>
        </Stack.Navigator>
    )
}

export const Navigator = () => {
    if(false) {
        return (
            <NavigationContainer>
                <AuthNavigator />
            </NavigationContainer>
        )
    }
    else {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Main" tabBarOptions={{
                    // activeBackgroundColor: 'red',
                    labelPosition: 'below-icon',
                    labelStyle: {

                    },
                    inactiveTintColor: '#E1E1E1',
                    activeTintColor: '#fff',
                    style: {
                        height: 65,
                        backgroundColor: '#2BDA8E',
                        paddingBottom: 10,
                        paddingTop: 10,
                    }
                }}>
                    <Tab.Screen name="Main" component={MainNavigator} options={{
                        tabBarLabel: 'Главная',
                        tabBarIcon: () => {
                            return (
                                <Image source={require('../assets/icons/home.png')} style={{width: 20, height: 20}} />
                                )
                        }
                    }}/>
                    <Tab.Screen name="Settings" component={Settings} options={{
                        tabBarLabel: 'Настройки',
                        tabBarIcon: () => {
                            return (
                                <Image source={require('../assets/icons/settings.png')} style={{width: 20, height: 20}} />
                            )
                        }
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}

