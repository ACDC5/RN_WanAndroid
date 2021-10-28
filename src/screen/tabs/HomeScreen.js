/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchHomeAddCollect,
  fetchHomeBanner,
  fetchHomeCancelCollect,
  fetchHomeList,
  fetchHomeListMore,
} from '../../actions';
import NavBar from '../../component/NavBar';
import Banner from '../../component/Banner';
import globalStyles from '../../styles/globalStyles';
import {getRealDP as dp} from '../../utils/screenUtil';
import ListFooter from '../../component/ListFooter';
import ArticleItemRow from '../../component/ArticleItemRow';
import {i18n, showToast} from '../../utils/Utility';
import CommonFlatList from '../../component/CommonFlatList';

/**
 * 首页
 */
class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onFetchData = this.onFetchData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }
  // 当前组件挂载完后获取数据
  async componentDidMount() {
    await this.onFetchData();
  }
  // (由生命周期调用)首次打开页面时获取数据
  async onFetchData() {
    await Promise.all([fetchHomeBanner(), fetchHomeList()]);
  }

  // 下拉刷新页面.子组件CommonFlatList使用了这个函数
  async onRefresh() {
    this.setState({isRefreshing: true});
    //刷新首页数据
    await Promise.all([fetchHomeBanner(), fetchHomeList()]);
    this.setState({isRefreshing: false});
    console.log('下拉刷新首页动作');
  }

  onEndReached() {
    const {isFullData} = this.props;
    if (isFullData) {
      return;
    }
    fetchHomeListMore(this.props.page);
  }

  // TODO 为什么参数要用{}包裹?
  renderItem({item, index}) {
    // TODO 2 数据源:this.props来自父组件，即来自项目的App.js的Provider属性store;store管理了所有状态
    const {navigation, isLogin} = this.props;
    return (
      // <View>
      //   <Text>12345{item.title}</Text>
      // </View>
      <ArticleItemRow
        navigation={navigation}
        item={item}
        onCollectPress={() => {
          if (!isLogin) {
            showToast(i18n('please-login-first'));
            return navigation.navigate('Login');
          }
          if (item.collect) {
            fetchHomeCancelCollect(item.id, index);
          } else {
            fetchHomeAddCollect(item.id, index);
          }
        }}
      />
    )
  }

  renderHeader() {
    // 获取父组件传过来的指定的值（这里的this.props可能是redux的action层，即home.js文件）
    const {navigation, homeBanner} = this.props;
    return (
      <View>
        <Banner bannerArr={homeBanner} navigation={navigation} />
        {/*<View style={{height: dp(20)}} />*/}
      </View>
    );
  }

  renderFooter() {
    const {isRenderFooter, isFullData, themeColor} = this.props;
    return (
      <ListFooter
        isRenderFooter={isRenderFooter}
        isFullData={isFullData}
        indicatorColor={themeColor}
      />
    );
  }
  // 这里的渲染函数只负责展示数据,几乎没有调用任何业务函数
  render() {
    //this.props...就是在通过mapStateToProps函数获取store中的数据
    // alert(this.props.isLogin);
    console.log('@@',this.prop)
    const {navigation, dataSource} = this.props;
    console.log('主页的数据源不是对象吗 '+ dataSource + '---导航' + navigation)
    return (
      <View style={globalStyles.container}>
        {/*顶部标题栏*/}
        <NavBar
          title={i18n('wanAndroid')}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
          onLeftPress={() => navigation.toggleDrawer()}
          onRightPress={() => navigation.navigate('Search')}
        />
        {/*首页内容*/}
        <CommonFlatList
          data={dataSource}
          keyExtractor={item => item.id.toString()}
          // renderItem函数相当于循环了data数组
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.onEndReached}
          isRefreshing={this.state.isRefreshing}
          toRefresh={this.onRefresh}
        />
      </View>
    );
  }
}

//参数state即指向reducers(目录)中定义的数据/状态
//在这个箭头函数中可以返回任意Reducers的state
// (既可以获取当前app的任意state给当前组件使用)
const mapStateToProps = state => {
  return {
    page: state.home.page,
    dataSource: state.home.dataSource,
    homeBanner: state.home.homeBanner,
    homeList: state.home.homeList,
    isRenderFooter: state.home.isRenderFooter,
    isFullData: state.home.isFullData,
    isLogin: state.user.isLogin,
    themeColor: state.user.themeColor,
    language: state.user.language,
  };
};

//概念：
// 通过connect函数将UI组件和数据绑定在一起。通过映射关系从store获取数据(mapStateToProps)
//UI组件HomeScreen
export default connect(mapStateToProps)(HomeScreen);
