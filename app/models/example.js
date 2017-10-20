import * as authService from '../services/auth'

export default {
    namespace: 'example',
    state: {
        exampleList: [],
        examplePaginate: {},
    },
    reducers: {
        // 保存列表数据
        saveExampleList(state, { exampleList, examplePaginate }) {
            return {
                ...state,
                exampleList,
                examplePaginate,
            }
        },

        // 清除列表页数据
        removeExampleList(state) {
            return {
                ...state,
                exampleList: [],
                examplePaginate: {},
            }
        },
    },
    effects: {
        // 3.1.1 长列表示例
        *fetchExampleList({ payload }, { call, put }) {
            const {
                response: { status, data },
            } = yield call(authService.fetchExampleList, payload)

            if (status === 1) {
                yield put({
                    type: 'saveExampleList',
                    exampleList: data.list,
                    examplePaginate: data.paginate,
                })
            }
        },
    },
    subscriptions: {},
}
