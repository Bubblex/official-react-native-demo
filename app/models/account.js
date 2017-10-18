import * as authService from '../services/auth'
import { NavigationActions } from '../utils'

export default {
  namespace: 'account',
  state: {},
  reducers: {},
  effects: {
    // 2.1.1 登录
    *fetchLogin({ payload }, { call, put }) {
      const { response: { status } } = yield call(
        authService.fetchLogin,
        payload
      )

      if (status === 1) {
        yield put(NavigationActions.navigate({ routeName: 'Detail' }))
      }
    },
  },
  subscriptions: {},
}
