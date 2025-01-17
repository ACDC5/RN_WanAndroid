import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {getRealDP as dp} from './utils/screenUtil';
// import StackViewStyleInterpolator from 'react-navigation-stack/lib/commonjs/views/StackView/StackViewStyleInterpolator';
import BottomTabBar from './component/BottomTabBar';
// Screen
import Test_Hot from "./screen/tabs/Test-Hot";
import HomeScreen from './screen/tabs/HomeScreen';
import SystemScreen from './screen/tabs/SystemScreen';
import WxArticleScreen from './screen/tabs/WxArticleScreen';
import GuideScreen from './screen/tabs/GuideScreen';
import ProjectScreen from './screen/tabs/ProjectScreen';
import DrawerScreen from './screen/drawer/DrawerScreen';
import WebViewScreen from './screen/article/WebViewScreen';
import LoginScreen from './screen/drawer/LoginScreen';
import RegisterScreen from './screen/drawer/RegisterScreen';
import ArticleTabScreen from './screen/article/ArticleTabScreen';
import WebsitesScreen from './screen/drawer/WebsitesScreen';
import SearchScreen from './screen/article/SearchScreen';
import SearchArticleScreen from './screen/article/SearchArticleScreen';
import AboutScreen from './screen/drawer/AboutScreen';
import CollectScreen from './screen/drawer/CollectScreen';
import CoinDetailScreen from './screen/drawer/CoinDetailScreen';
import SettingScreen from './screen/drawer/SettingScreen';
import LanguageScreen from './screen/drawer/LanguageScreen';

// 导航配置
const TabScreens = createBottomTabNavigator(
  {
    Home: HomeScreen,
    System: SystemScreen,
    WxArticle: WxArticleScreen,
    Guide: GuideScreen,
    Project: ProjectScreen,
    TestHot: Test_Hot
  },
  {
    defaultNavigationOptions: {
        //底部导航按钮图标的大小，全球化等信息合一的组件
        //这里的props数据来自store，
        //因为这个导航配置文件(AppNavigator)是在App.js中被<Provider>包裹的
      tabBarButtonComponent: props => <BottomTabBar {...props} />,
    },
    tabBarOptions: {
      showLabel: false,
      showIcon: false,
      style: {
        height: dp(100),
        borderTopWidth: 0,
      },
    },
  },
);

//左侧抽屉导航栏
const drawerNavigator = createDrawerNavigator(
  {
    Tabs: TabScreens,
  },
  {
    drawerWidth: dp(600),
    contentComponent: DrawerScreen,
    hideStatusBar: false,
    statusBarAnimation: 'fade',
    defaultNavigationOptions: {
      drawerLockMode: 'unlocked',
    },
  },
);

// 抽屉式导航(栈堆)
const RootStack = createStackNavigator(
  {
    Home: drawerNavigator,
    WebView: WebViewScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    ArticleTab: ArticleTabScreen,
    Websites: WebsitesScreen,
    Search: SearchScreen,
    SearchArticle: SearchArticleScreen,
    About: AboutScreen,
    Collect: CollectScreen,
    CoinDetail: CoinDetailScreen,
    Setting: SettingScreen,
    Language: LanguageScreen,
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    // 用于设置安卓卡片式跳转
    // transitionConfig: () => ({
    //   screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    // }),
    navigationOptions: () => ({
      gesturesEnabled: true,
    }),
    // 默认导航头样式设置
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(RootStack);
