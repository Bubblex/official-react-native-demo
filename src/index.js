import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Welcome from './screen/home'
import UserScreen from './screen/user'

export const MyApp = StackNavigator({
    Home: { screen: Welcome },
    User: { screen: UserScreen }
})

AppRegistry.registerComponent('MyApp', () => MyApp);
