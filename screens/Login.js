import React from 'react'
import { StyleSheet, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native'

import { Button, Block, Text, Input } from '../components'
import { theme } from '../constants'

export default class Login extends React.Component {

    state = {
        email: '',
        password: '',
        errors: [],
        loading: false
    }

    handleLogin() {
        const { navigation }  = this.props
        const { email, password } = this.state
        const errors = []

        Keyboard.dismiss()

        this.setState({loading: true})

        if(email !== 'example@mail.ru') {
            errors.push('email')
        }
        if(password !== 'password') {
            errors.push('password')
        }

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
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[20, theme.sizes.padding * 2]} style={{backgroundColor: '#fff'}}>
                    <Text h1 bold>Вход</Text>
                    <Block middle>
                        <Input
                            label='Email'
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({email: text})}
                        />
                        <Input
                            secure
                            label='Пароль'
                            error={hasErrors('password')}
                            style={[styles.input, hasErrors('password')]}
                            defaultValue={this.state.password}
                            onChangeText={password => this.setState({password: password})}
                        />
                        <Button gradient onPress={() => this.handleLogin()}>
                            {
                                loading ? <ActivityIndicator size='small' color='white' /> : <Text bold white center>Войти</Text>
                            }
                        </Button>
                        <Button onPress={() => navigation.navigate('Forgot')}>
                            <Text gray caption center style={{textDecorationLine: 'underline'}}>Забыли пароль?</Text>
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
    login: {
        flex: 1,
        justifyContent: 'center'
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent
    }
})