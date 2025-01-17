/**
 * Created by huangjunsheng on 2019-10-02
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {DEVICE_WIDTH, getRealDP as dp, isAndroid} from '../utils/screenUtil';
import Color from '../utils/Color';
import {i18n} from '../utils/Utility';

class BottomTabBar extends PureComponent {
  render() {
    const {route, focused, themeColor,} = this.props;

    const {routeName} = route;
    // alert(themeColor+focused+routeName)
    let tabBarLabel, tabBarIconName, tabBarIconSize;
    switch (routeName) {
      case 'Home':
        tabBarLabel = i18n('home');
        tabBarIconName = 'android-home';
        tabBarIconSize = dp(50);
        break;
      case 'System':
        tabBarLabel = i18n('system');
        tabBarIconName = 'android-school';
        tabBarIconSize = dp(55);
        break;
      case 'WxArticle':
        tabBarLabel = i18n('publicAccount');
        tabBarIconName = 'ios-people';
        tabBarIconSize = dp(64);
        break;
      case 'Guide':
        tabBarLabel = i18n('Navigation');
        tabBarIconName = 'ios-rocket';
        tabBarIconSize = dp(50);
        break;
      case 'TestHot':
        //调用i18n函数时，必须配置好相应的文件(此app的语言配置是LanguageUtil.js);
        // i18n函数的参数，必须在语种配置文件(如zh-Hans.js)中配置好对应语种
        tabBarLabel = i18n('testHot');
        tabBarIconName = 'android-school';
        tabBarIconSize = dp(50);
        break;
      default:
        tabBarLabel = i18n('project');
        tabBarIconName = 'ios-paper';
        tabBarIconSize = dp(50);
        break;
    }
    const tabBarColor = focused ? themeColor : Color.TEXT_LIGHT;
    const content = (
      <View style={styles.tabBarWrapper}>
        <View style={styles.iconWrapper}>
          <Icon
            name={tabBarIconName}
            size={tabBarIconSize}
            color={tabBarColor}
          />
        </View>
        <Text style={[styles.tabBarLabel, {color: tabBarColor}]}>
          {tabBarLabel}
        </Text>
      </View>
    );
    // TODO 新增的导航按钮没有显示
    // if (isAndroid) {
    //   return (
    //     <TouchableNativeFeedback
    //       background={TouchableNativeFeedback.Ripple(
    //         'rgba(50,50,50,0.1)', true,)}
    //       {...this.props}
    //     >
    //       {content}
    //     </TouchableNativeFeedback>
    //   );
    // }
    return (
      <TouchableOpacity activeOpacity={0.8} {...this.props}>
        {content}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    width: DEVICE_WIDTH / 5,
    height: dp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: dp(20),
  },
  iconWrapper: {
    width: dp(65),
    height: dp(65),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    themeColor: state.user.themeColor,
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(BottomTabBar);
