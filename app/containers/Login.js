import React, { Component } from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { connect } from 'react-redux'
import { List, InputItem, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'

import { createAction, NavigationActions } from '../utils'

@connect(state => state)
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  onLogin = () => {
    this.props.dispatch(createAction('app/login')())
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  handleLogin = () => {
    const { form, dispatch } = this.props

    dispatch({
      type: 'account/fetchLogin',
      payload: {
        ...form.getFieldsValue(),
      },
    })
  }

  render() {
    const { fetching, form: { getFieldProps } } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.tittle}>登录</Text>
        <List>
          <InputItem {...getFieldProps('username')}>账号</InputItem>
          <InputItem {...getFieldProps('password')}>密码</InputItem>
        </List>
        <WhiteSpace size="md" />
        <Button title="Login" onPress={this.handleLogin} />
        <WhiteSpace size="md" />

        {
          // fetching ? (
          //   <ActivityIndicator />
          // ) : (
          //   <Button title="Login" onPress={this.onLogin} />
          // )
        }
        {!fetching && <Button title="Back" onPress={this.onClose} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  tittle: {
    textAlign: 'center',
    marginBottom: 100,
    marginTop: 100,
    fontSize: 30,
  },
})

export default createForm()(Login)
