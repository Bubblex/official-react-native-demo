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
import Car from './containers/Car'
import Cart from './containers/Cart'
import Albums from './containers/Albums'
import AnimatedPage from './containers/example/Animated'

import Maps from './containers/example/Maps'
import Amap from './containers/example/Amap'
import Echart from './containers/example/Echart'
import TakePicture from './containers/example/TakePicture'
import FlatList from './containers/example/FlatList'
import Interaction from './containers/example/Interaction'
import Flexbox from './containers/example/Flexbox'
import Swiper from './containers/custom/Swiper'
import Materialkit from './containers/custom/Materialkit'

import ThemeConfig from './config/theme'

// 底部标签栏
const HomeNavigator = TabNavigator(
    {
        Home: { screen: Home },
        Albums: { screen: Albums },
        Cart: { screen: Cart },
        Account: { screen: Account },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazyLoad: true,
        tabBarOptions: {
            activeTintColor: ThemeConfig.brandPrimary,
            inactiveTintColor: 'gray',
            style: {
                backgroundColor: '#fff',
            },
        },
    },
)

// 顶部导航条
const MainNavigator = StackNavigator(
    {
        HomeNavigator: { screen: HomeNavigator },
        Detail: { screen: Detail },
        FlatList: { screen: FlatList },
        Maps: { screen: Maps },
        Car: { screen: Car },
        Echart: { screen: Echart },
        TakePicture: { screen: TakePicture },
        Amap: { screen: Amap },
        Interaction: { screen: Interaction },
        Flexbox: { screen: Flexbox },
        Swiper: { screen: Swiper },
        Materialkit: { screen: Materialkit },
    },
    {
        headerMode: 'float',
        navigationOptions: {
            headerTintColor: '#333',
            headerStyle: {
                backgroundColor: ThemeConfig.brandPrimary,
            },
        },
    },
)

const AppNavigator = StackNavigator(
    {
        Main: { screen: MainNavigator },
        Login: { screen: Login },
        Animated: { screen: AnimatedPage },
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
            console.warn('example')
        }
        else if (currentScreen === 'Home') {
            // console.warn('Home')
            // this.props.dispatch({
            //     type: 'common/fetchBanner',
            // })
        }

        return (
            <AppNavigator
                navigation={navigation}
                screenProps={{ themeColor: ThemeConfig.brandPrimary }}
            />
        )
    }
}

export function routerReducer(state, action = {}) {
    return AppNavigator.router.getStateForAction(action, state)
}

export default Router
