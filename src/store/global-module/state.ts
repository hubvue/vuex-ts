export interface LoginInfo {
  status?: string;
  type?: string;
  user?: string;
  token?: string;
}
export interface UserInfo {
  userId?: number;
  userName?: string;
  type?: number;
  driverId?: number;
  positionType?: string;
  businessType?: string;
  headImg?: string;
  cityId?: number;
  roleId?: number;
  roleType?: string;
}

export interface GolbalState {
  loginInfo: LoginInfo;
  userInfo: UserInfo;
}
export const globalState: GolbalState = {
  loginInfo: {
    status: '已登录',
    type: '',
    user: '',
    token: '',
  },
  userInfo: {
    userId: 0,
    userName: '',
    type: 0, // 是否是内部员工
    driverId: 0,
    positionType: '', // 权限
    businessType: '', // 业务线
    headImg: '',
    cityId: 0,
    roleId: 0,
    roleType: ''
  }
}
