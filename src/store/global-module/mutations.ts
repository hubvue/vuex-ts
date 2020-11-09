import { GlobalMutationTypes } from './mutation-types'
import { LoginInfo, UserInfo } from './state'

export const globalMutations = {
  [GlobalMutationTypes.SET_USER_INFO]( {state }, data: UserInfo) {
    state.userInfo = data
  },
  [GlobalMutationTypes.SET_LOGIN_INFO]( {state}, data: LoginInfo) {
    state.loginInfo = Object.assign(state.loginInfo, data)
  }
}