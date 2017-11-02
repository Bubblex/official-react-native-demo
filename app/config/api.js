/**
 * 接口统一前缀
 * @type {string}
 */
const DOMIN = 'https://easy-mock.com/mock/59e06355e2fd4e67507fb1a1/api'

const COMMON = '/common'

export default {
    TEST_API: 'http://test4.xiaomaowu.com/api/recommend/data',

    // 1.1.1 首页宫格菜单
    BANNER: `${DOMIN}${COMMON}/banner`,

    // 2.1.1 登录
    LOGIN: `${DOMIN}/login`,

    // 3.1.1 长列表示例
    EXAMPLE_LIST: `${DOMIN}/example/list`,
}
