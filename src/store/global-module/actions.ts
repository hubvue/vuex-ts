import {GlobalMutationTypes} from './mutation-types'
import { LoginInfo, UserInfo } from './state'

export const golbalActions = {
  setLoginInfo: async ({commit}, data: LoginInfo): Promise<any> => {
    commit(GlobalMutationTypes.SET_LOGIN_INFO, data)
  },
  clearLoginInfo: async ({ commit }): Promise<any> => {
    commit(GlobalMutationTypes.SET_LOGIN_INFO, {})
  },
  setUserInfo: async ({ commit }, data: UserInfo): Promise<any> => {
    commit(GlobalMutationTypes.SET_USER_INFO, data)
  },
  clearUserInfo: async ({ commit }): Promise<any> => {
    commit(GlobalMutationTypes.SET_USER_INFO, {})
  }
}
