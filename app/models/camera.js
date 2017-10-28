// import * as authService from '../services/auth'
// import { NavigationActions } from '../utils'

export default {
    namespace: 'camera',
    state: {
        qrcodeData: '',
    },
    reducers: {
        saveQrcodeData(state, { qrcodeData }) {
            return {
                ...state,
                qrcodeData,
            }
        },
    },
    effects: {},
    subscriptions: {},
}
