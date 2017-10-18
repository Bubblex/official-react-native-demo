import { delay } from '../utils'
import request from '../utils/request'
import API from '../config/api'

export const login = async () => {
    await delay(2000)
    return true
}

export async function testFetch(params) {
    return request(API.TEST_API, {
        body: JSON.stringify(params),
    })
}

// 1.1.1 首页宫格菜单
export async function fetchBanner(params) {
    return request(API.BANNER, {
        body: JSON.stringify(params),
    })
}

// 2.1.1 登录
export async function fetchLogin(params) {
    return request(API.LOGIN, {
        body: JSON.stringify(params),
    })
}
