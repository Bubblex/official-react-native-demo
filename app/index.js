import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'

import dva from './utils/dva'
import Router from './router'

import commonModel from './models/common'
import cameraModel from './models/camera'
import routerModel from './models/router'
import exampleModel from './models/example'
import accountModel from './models/account'

const app = dva({
    initialState: {},
    models: [commonModel, routerModel, accountModel, exampleModel, cameraModel],
    extraEnhancers: [autoRehydrate()],
    onError(e) {
        console.log('onError', e)
    },
})

const App = app.start(<Router />)
persistStore(app.getStore(), {
    storage: AsyncStorage,
    blacklist: ['router'],
})

AppRegistry.registerComponent('DvaStarter', () => App)
