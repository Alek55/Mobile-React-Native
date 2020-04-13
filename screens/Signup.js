import React from 'react'
import {StyleSheet, KeyboardAvoidingView, Keyboard, ActivityIndicator, Alert} from 'react-native'

import { Button, Block, Text, Input } from '../components'
import { theme } from '../constants'

export default class Signup extends React.Component {

    state = {
        email: null,
        username: null,
        password: null,
        errors: [],
        loading: false
    }

    handleSignup() {
        const { navigation }  = this.props
        const { email, password, username } = this.state
        const errors = []

        Keyboard.dismiss()

        this.setState({loading: true})

        if(!email) errors.push('email')
        if(!username) errors.push('username')
        if(!password) errors.push('password')

        this.setState({errors, loading: false})
        if(!errors.length) {
            navigation.navigate('Main')
        }
    }

    render() {
        const { navigation }  = this.props
        const { loading, errors } = this.state
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null
        return (
            <KeyboardAvoidingView style={styles.signup} behavior="padding">
                <Block padding={[0, theme.sizes.padding * 2]} style={{backgroundColor: '#fff'}}>
                    <Text h1 bold>Регистрация</Text>
                    <Block middle>
                        <Input
                            email
                            label='Email'
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({email: text})}
                        />
                        <Input
                            label='Имя'
                            error={hasErrors('username')}
                            style={[styles.input, hasErrors('username')]}
                            defaultValue={this.state.username}
                            onChangeText={text => this.setState({username: text})}
                        />
                        <Input
                            secure
                            label='Пароль'
                            error={hasErrors('password')}
                            style={[styles.input, hasErrors('password')]}
                            defaultValue={this.state.password}
                            onChangeText={password => this.setState({password: password})}
                        />
                        <Button gradient onPress={() => this.handleSignup()}>
                            {
                                loading ? <ActivityIndicator size='small' color='white' /> : <Text bold white center>Зарегистрироваться</Text>
                            }
                        </Button>
                        <Button onPress={() => navigation.goBack()}>
                            <Text gray caption center style={{textDecorationLine: 'underline'}}>Вернуться назад</Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    signup: {
        flex: 1,
        justifyContent: 'center'
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent
    }
})