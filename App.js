import React, {PureComponent} from 'react';
import {StatusBar, View,Text,Button,PermissionsAndroid} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {pickBy, identity} from 'lodash';
import AppNavigator from './src';
import {setAxios} from './src/service/setAxios';
import store from './src/store';
import AuthUtil from './src/utils/AuthUtil';
import {switchAPPLanguage, toInitialAuthInfo} from './src/actions';
import Toast from './src/utils/Toast';

// PureComponent组件的原理：当组件更新时，如果组件的 props 和 state 都没发生改变(场景:左侧菜单导航栏，底部导航按钮)，
// render 方法就不会触发，省去 Virtual DOM 的生成和比对过程，
// 达到提升性能的目的。具体就是 React 自动帮我们做了一层浅比较：

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    //其实initialInfo可以不用绑定this，
    // 因为放在initialInfo放在componentDidMount中它的this指向的就是当前组件的实例，
    // 原因是componentDidMount是组件的生命周期函数
    this.initialInfo = this.initialInfo.bind(this)
    // this.test = this.test.bind(this)
  }

  static async getDerivedStateFromProps() {
    const language = await AuthUtil.getAppLanguage();
    if (language) {
      await switchAPPLanguage(language); // 设置app语言环境
    } else {
      await switchAPPLanguage('zhHans'); // 默认中文
    }
  }

  // 组件挂载后
  componentDidMount() {
    SplashScreen.hide();
    setAxios(); // 网络设置
    global.toast = this.refs.toast; // 全局引用赋值
    this.initialInfo();
    this.requestCameraPermission()
  }

  b = 1
  async initialInfo() {
    const userInfo = await AuthUtil.getUserInfo();
    const themeColor = await AuthUtil.getThemeColor();
    const authInfo = pickBy(
      {
        isLogin: !!userInfo,
        userInfo,
        themeColor,
      },
      identity,
    );
    if (Object.keys(authInfo).length === 0) {
      return;
    }
    console.log('初始化缓存信息', authInfo);
    toInitialAuthInfo(authInfo);
  }

  requestCameraPermission = async () => {
    try{
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title:"测试获取相机权限",
            message:"本应用想获取你的相机权限",
            // buttonNeutral:"稍后再说",
            // buttonNegative:"取消",
            buttonPositive:"允许"
          },
      )
      //TODO granted 变量is null,没有拿到任何东西，请求相机权限失败了(//TODO 第二天成功拿到权限。。。无语)
      if(granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('你可以使用相机')
      } else {
        alert('获取相机权限被拒接')
      }
    } catch (e) {
      console.warn(e)
    }
  }

  test = () => {
    console.log('糖果',this)
  }

  render() {
    console.log('------render')
    return (
      // 数据源<Store>;通过<Provider>的包裹，所有组件都能通过connect方法拿到Store中数据
      <Provider store={store}>
        <View style={{flex: 1}}>
          {/*<StatusBar barStyle={'light-content'} translucent={true} />*/}
          {/*app顶部title和底部导航按钮*/}
          <AppNavigator />
          {/*app 内容区*/}
          <Toast ref="toast" />

          <Button title="request permissions" onPress={this.test} />
        </View>
      </Provider>
    );
  }

  componentWillUnmount() {
    console.log('App组件即将被卸载')
  }

  // UNSAFE_componentWillMount() {
  //   console.log('App----------------------******************8-UNSAFE_componentWillMount')
  // }

  static getDerivedStateFromProps() {
    console.log('App----------------------****************** DSFP')
    return null
  }
}

export default App;
