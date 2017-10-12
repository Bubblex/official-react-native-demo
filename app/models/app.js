import { createAction, NavigationActions } from '../utils'
import * as authService from '../services/auth'
import { testFetch } from '../services/auth'

export default {
  namespace: 'app',
  state: {
    fetching: false,
    login: false,
    username: 'jiangxiao',
  },
  reducers: {
    loginStart(state, { payload }) {
      return { ...state, ...payload, fetching: true }
    },
    loginEnd(state, { payload }) {
      return { ...state, ...payload, fetching: false }
    },

    changeUsername(state, { username }) {
      return {
          ...state,
          username,
      }
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
          })
        )
      }
      yield put(createAction('loginEnd')({ login }))
    },

    *fetchTest({ payload }, { call, put }) {
      const {
          response: {
              message,
          },
      } = yield call(testFetch, payload)

      yield put({
          type: 'changeUsername',
          username: message,
      })
  },
  },
}
