import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
    addNavigationHelpers,
    NavigationActions,
} from 'react-navigation'
import { connect } from 'react-redux'

import Login from './containers/Login'
import Home from './containers/Home'
import Account from './containers/Account'
import Detail from './containers/Detail'
import Example from './containers/Example'
import Car from './containers/Car'
import TakePicture from './containers/camera/TakePicture'
import Maps from './containers/maps/Maps'
import Discover from './containers/Discover'

// 底部标签栏
const HomeNavigator = TabNavigator(
    {
        Home: { screen: Home },
        TakePicture: { screen: TakePicture },
        Discover: { screen: Discover },
        Account: { screen: Account },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazyLoad: true,
    },
)

// 顶部导航条
const MainNavigator = StackNavigator(
    {
        HomeNavigator: { screen: HomeNavigator },
        Detail: { screen: Detail },
        Example: { screen: Example },
        Maps: { screen: Maps },
        Car: { screen: Car },
    },
    {
        headerMode: 'float',
    },
)

const AppNavigator = StackNavigator(
    {
        Main: { screen: MainNavigator },
        Login: { screen: Login },
    },
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: (sceneProps) => {
                const { layout, position, scene } = sceneProps
                const { index } = scene

                const height = layout.initHeight
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                })

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                })

                return { opacity, transform: [{ translateY }] }
            },
        }),
    },
)

export function getCurrentScreen(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getCurrentScreen(route)
    }
    return route.routeName
}

@connect(({ router }) => ({ router }))
class Router extends PureComponent {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getCurrentScreen(this.props.router)
        if (currentScreen === 'Login') {
            return true
        }
        if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        }
        return false
    }

    render() {
        const { dispatch, router } = this.props
        const navigation = addNavigationHelpers({ dispatch, state: router })

        const currentScreen = getCurrentScreen(this.props.router)
        if (currentScreen === 'Example') {
            console.log('example')
        }

        return (
            <AppNavigator
                navigation={navigation}
                screenProps={{ themeColor: 'lightblue' }}
            />
        )
    }
}

export function routerReducer(state, action = {}) {
    return AppNavigator.router.getStateForAction(action, state)
}

export default Router
