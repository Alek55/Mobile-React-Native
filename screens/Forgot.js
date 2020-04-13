import React from 'react'
import { StyleSheet, KeyboardAvoidingView, Keyboard, ActivityIndicator, Alert } from 'react-native'

import { Button, Block, Text, Input } from '../components'
import { theme } from '../constants'

export default class Forgot extends React.Component {

    state = {
        email: '',
        errors: [],
        loading: false
    }

    handleForgot() {
        const { navigation }  = this.props
        const { email } = this.state
        const errors = []

        Keyboard.dismiss()

        this.setState({loading: true})

        if(email !== 'example@mail.ru') {
            errors.push('email')
        }

        this.setState({errors, loading: false})
        if(!errors.length) {
            Alert.alert(
                'Готово!',
                `Новый пароль отправлен вам на ${email}`,
                [
                    {
                        text: 'ОК', onPress: () => {
                            navigation.goBack()
                        }
                    }
                ],
                {cancelable: false}
            )
        }
        else {
            Alert.alert(
                `Упс...(`,
                'Такой email не зарегистрирован',
                [
                    {text: 'ОК'}
                ],
                {cancelable: false}
            )
        }
    }

    render() {
        const { navigation }  = this.props
        const { loading, errors } = this.state
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null
        return (
            <KeyboardAvoidingView style={styles.forgot} behavior="padding">
                <Block padding={[20, theme.sizes.padding * 2]} style={{backgroundColor: '#fff'}}>
                    <Text h1 bold>Забыли пароль?</Text>
                    <Block middle>
                        <Input
                            label='Email'
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({email: text})}
                        />
                        <Button gradient onPress={() => this.handleForgot()}>
                            {
                                loading ? <ActivityIndicator size='small' color='white' /> : <Text bold white center>Отправить</Text>
                            }
                        </Button>
                        <Button onPress={() => navigation.navigate('Login')}>
                            <Text gray caption center style={{textDecorationLine: 'underline'}}>Вернуться назад</Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    forgot: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent
    }
})