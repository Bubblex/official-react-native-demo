import { createAction, NavigationActions } from '../utils'
import * as authService from '../services/auth'

export default {
    namespace: 'common',
    state: {
        fetching: false,
        login: false,

        indexBanner: {
            banner: [],
            grid: [],
        },
    },
    reducers: {
        loginStart(state, { payload }) {
            return { ...state, ...payload, fetching: true }
        },
        loginEnd(state, { payload }) {
            return { ...state, ...payload, fetching: false }
        },

        saveBanner(state, { indexBanner }) {
            return { ...state, indexBanner }
        },
    },
    effects: {
        *login({ payload }, { call, put }) {
            yield put(createAction('loginStart')())
            const login = yield call(authService.login, payload)
            if (login) {
                yield put(
                    NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Main' })],
                    }),
                )
            }
            yield put(createAction('loginEnd')({ login }))
        },

        // 1.1.1 首页宫格菜单
        *fetchBanner({ payload }, { call, put }) {
            const { response: { data, status } } = yield call(
                authService.fetchBanner,
                payload,
            )

            if (status === 1) {
                yield put({
                    type: 'saveBanner',
                    indexBanner: data,
                })
            }
        },
    },
    subscriptions: {},
}
