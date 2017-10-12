import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import dva from 'dva-core'

import Welcome from './screen/home'
import UserScreen from './screen/user'

export const MyApp = StackNavigator({
    Home: { screen: Welcome },
    User: { screen: UserScreen }
})

const app = dva()

app.model({
    namespace: 'user',
    state: {},
    reducers: {},
    effects: {},
    subscriptions: {},
})

app.router(() => <MyApp />)

AppRegistry.registerComponent('MyApp', () => app.start())
