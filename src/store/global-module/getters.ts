import {GolbalState} from './state'

const userInfoGetter = (state: GolbalState) => state.userInfo
const loginInfoGetter = (state: GolbalState) => state.loginInfo

export const golbalGetters = {
  userInfo: userInfoGetter,
  loginInfo: loginInfoGetter
}