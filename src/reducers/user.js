/**
 * Created by hjs on 2019-09-20
 */
import actionTypes from '../actions/actionType';
import Color from '../utils/Color';

// redux的store层。只有store能接收自己的内容，reducer不能
// 每个模块的state都由自身的reducers来Store管理
const initialStore = {
  isLogin: false, // 是否已登录
  userInfo: {
    admin: false,
    chapterTops: [],
    collectIds: [],
    email: '',
    icon: '',
    id: '',
    nickname: '',
    password: '',
    publicName: '',
    token: '',
    type: '',
    username: '',
  }, // 用户信息
  themeColor: Color.THEME, // 用户设置APP主题色
  language: 'zhHans', // APP默认语言
};

// redux的reducer层.reducer必需是纯函数(返回的结果必须由自身传入的参数参数决定)
const user = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TO_REGISTER:
      return {
        ...state,
        isLogin: false,
      };
    case actionTypes.FETCH_TO_LOGIN:
      return {
        ...state,
        isLogin: true,
        userInfo: action.userInfo,
      };
    case actionTypes.FETCH_TO_LOGIN_FAILURE:
      return {
        ...state,
        isLogin: false,
      };
    case actionTypes.FETCH_TO_LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case actionTypes.CHANGE_THEME_COLOR:
      return {
        ...state,
        themeColor: action.themeColor,
      };
    case actionTypes.INITIAL_AUTH_INFO: //来自action层的actionType
      return {
        ...state,
        ...action.initialInfo, //action将app缓存的信息返回给首页组件
      };
    case actionTypes.SWITCH_APP_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};

export default user;
