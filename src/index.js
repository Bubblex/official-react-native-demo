import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Welcome from './screen/home'

export const MyApp = StackNavigator({
    Home: { screen: Welcome }
})

AppRegistry.registerComponent('MyApp', () => MyApp);
