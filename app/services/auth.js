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

