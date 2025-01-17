/**
 * Created by hjs on 2019-09-17
 */
import {DeviceEventEmitter} from 'react-native';
import {
  getHomeBanner,
  getHomeList,
  getSystemData,
  getWxArticleTabs,
  goToRegister,
  goToLogin,
  goToLogout,
  getGuideData,
  getWxArticleList,
  getProjectTree,
  getOftenUsedWebsites,
  getSearchHotKey,
  getSearchArticle,
  getCollectArticleList,
  addCollectArticle,
  cancelCollectArticle,
  cancelMyCollectArticle,
  getMyCoinList,
  getMyCoinInfo,
  cst_FetchData,
} from '../api';
import store from '../store';
import {
  getHomeBannerAction,
  getHomeListAction,
  getHomeListFailureAction,
  getHomeListMoreAction,
  getToRegisterAction,
  getToLoginAction,
  getToLoginFailureAction,
  getToLogoutAction,
  getSystemDataAction,
  getWxArticleTabsAction,
  getGuideDataAction,
  updateSelectIndexAction,
  getProjectTabsAction,
  getOftenUsedWebsitesAction,
  getSearchHotKeyAction,
  getSearchArticleAction,
  getSearchArticleMoreAction,
  clearSearchArticleAction,
  getCollectArticleListAction,
  getCollectArticleMoreAction,
  getHomeAddCollectAction,
  getHomeCancelCollectAction,
  getChangeThemeColorAction,
  getInitialAuthInfoAction,
  getMyCollectCancelCollectAction,
  getMyCollectAddCollectAction,
  getSearchArticleAddCollectAction,
  getSearchArticleCancelCollectAction,
  getArticleLoadingAction,
  getMyCoinListAction,
  getMyCoinListMoreAction,
  getMyCoinInfoAction,
  getSwitchAPPLanguageAction,
  getPlazaContent,
  getPlazaFailureAction,
} from './action-creator';
import {i18n, showToast} from '../utils/Utility';
import AuthUtil from '../utils/AuthUtil';
import LanguageUtil from '../utils/LanguageUtil';

// 用户在进入“流行”导航页后，触发这个函数，由此触发redux的action动作，
export async function cst_PullPlaza() {
  // 1、cst_FetchData函数发起网络请求，
  await cst_FetchData()
      // 2、getPlazaContent函数获取服务器返回的数据后，触发指定action类型和函数，并更新store
      .then(res => store.dispatch(getPlazaContent(res.data)))
      .catch(e => store.dispatch(getPlazaFailureAction()));
}

export function fetchHomeBanner() {
  //store.dispatch将拿到最新数据返回给reducer的state，相应的组件将随着state的更新而更新
  //执行step:1。先进入getHomeBanner函数获取轮播图数据，返回数据后调用后续的回调函数
  // 2.进入getHomeBannerAction(action层)，返回后再进入reducers目录下的home.js(reducer层)
  getHomeBanner().then(res => store.dispatch(getHomeBannerAction(res.data)));
}

export async function fetchHomeList() {
  await getHomeList()
    .then(res => store.dispatch(getHomeListAction(res.data)))
    .catch(e => store.dispatch(getHomeListFailureAction()));
}

// 首页上拉获取更多数据
export function fetchHomeListMore(page) {
  getHomeList(page)
    .then(res => store.dispatch(getHomeListMoreAction(res.data)))
    .catch(e => store.dispatch(getHomeListFailureAction()));
}

export function fetchToRegister(params, navigation) {
  goToRegister(params)
    .then(res => {
      store.dispatch(getToRegisterAction(res.data));
      navigation.goBack();
      showToast('注册成功');
    })
    .catch(e => {
      showToast(e);
    });
}

export function fetchToLogin(params, navigation) {
  goToLogin(params)
    .then(async res => {
      store.dispatch(getToLoginAction(res.data));
      await AuthUtil.saveUserInfo(res.data);
      navigation.goBack();
      showToast('登录成功');
    })
    .catch(e => {
      showToast(e);
      store.dispatch(getToLoginFailureAction());
    });
}

export function fetchToLogout() {
  goToLogout()
    .then(async () => {
      await AuthUtil.removeCookie();
      await AuthUtil.removeUserInfo();
      store.dispatch(getToLogoutAction());
    })
    .catch(e => {});
}

export async function changeThemeColor(color) {
  await AuthUtil.saveThemeColor(color);
  store.dispatch(getChangeThemeColorAction(color));
}

// 初始化缓存数据（顺序为：执行getInitialAuthInfoAction，然后执行dispatch函数，
// reducer自动分配执行和actionType类型一致的reducer函数）
export function toInitialAuthInfo(initialInfo) {
  store.dispatch(getInitialAuthInfoAction(initialInfo));
}

export async function fetchSystemData() {
  await getSystemData()
    .then(res => store.dispatch(getSystemDataAction(res.data)))
    .catch(e => {});
}

export function fetchWxArticleTabs() {
  getWxArticleTabs()
    .then(res => store.dispatch(getWxArticleTabsAction(res.data)))
    .catch(e => {});
}

export function fetchWxArticleList(chapterId, page = 1) {
  return new Promise(async (resolve, reject) => {
    await getWxArticleList(chapterId, page)
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
}

export async function fetchGuideData() {
  await getGuideData()
    .then(res => store.dispatch(getGuideDataAction(res.data)))
    .catch(e => {});
}

export function updateSelectIndex(index) {
  store.dispatch(updateSelectIndexAction(index));
}

export function fetchProjectTabs() {
  getProjectTree()
    .then(res => store.dispatch(getProjectTabsAction(res.data)))
    .catch(e => {});
}

export function updateArticleLoading(isShowLoading) {
  store.dispatch(getArticleLoadingAction(isShowLoading));
}

export async function fetchOftenUsedWebsites() {
  await getOftenUsedWebsites()
    .then(res => store.dispatch(getOftenUsedWebsitesAction(res.data)))
    .catch(e => {});
}

export function fetchSearchHotKey() {
  getSearchHotKey()
    .then(res => store.dispatch(getSearchHotKeyAction(res.data)))
    .catch(e => {});
}

export async function fetchSearchArticle(key) {
  await getSearchArticle(key)
    .then(res => store.dispatch(getSearchArticleAction(res.data)))
    .catch(e => {});
}

export function fetchSearchArticleMore(key, page) {
  getSearchArticle(key, page)
    .then(res => store.dispatch(getSearchArticleMoreAction(res.data)))
    .catch(e => {});
}

export function clearSearchArticle() {
  store.dispatch(clearSearchArticleAction());
}

export async function fetchCollectArticleList() {
  await getCollectArticleList()
    .then(res => {
      const dataSource = res.data.datas;
      const datas = dataSource.map(el => {
        return {
          ...el,
          collect: true,
        };
      });
      store.dispatch(getCollectArticleListAction({...res.data, datas}));
    })
    .catch(e => {});
}

export function fetchCollectArticleMore(page) {
  getCollectArticleList(page)
    .then(res => {
      const dataSource = res.data.datas;
      const datas = dataSource.map(el => {
        return {
          ...el,
          collect: true,
        };
      });
      store.dispatch(getCollectArticleMoreAction({...res.data, datas}));
    })
    .catch(e => {});
}

// 首页文章收藏
export function fetchHomeAddCollect(id, index) {
  addCollectArticle(id)
    .then(res => {
      showToast(i18n('Have been collected'));
      store.dispatch(getHomeAddCollectAction(index));
    })
    .catch(e => {});
}

// 首页文章取消收藏
export function fetchHomeCancelCollect(id, index) {
  cancelCollectArticle(id)
    .then(res => store.dispatch(getHomeCancelCollectAction(index)))
    .catch(e => {});
}

// 我的收藏页-取消收藏
export function fetchMyCollectCancelCollect(id, originId, index) {
  cancelMyCollectArticle(id, originId)
    .then(res => store.dispatch(getMyCollectCancelCollectAction(index)))
    .catch(e => {});
}

// 我的收藏页-收藏
export function fetchMyCollectAddCollect(id, index) {
  addCollectArticle(id)
    .then(res => {
      showToast(i18n('Have been collected'));
      store.dispatch(getMyCollectAddCollectAction(index));
    })
    .catch(e => {});
}

// 搜索页文章收藏
export function fetchSearchArticleAddCollect(id, index) {
  addCollectArticle(id)
    .then(res => {
      showToast(i18n('Have been collected'));
      store.dispatch(getSearchArticleAddCollectAction(index));
    })
    .catch(e => {});
}

// 搜索页文章取消收藏
export function fetchSearchArticleCancelCollect(id, index) {
  cancelCollectArticle(id)
    .then(res => store.dispatch(getSearchArticleCancelCollectAction(index)))
    .catch(e => {});
}

export async function fetchMyCoinList(page) {
  await getMyCoinList(page)
    .then(res => store.dispatch(getMyCoinListAction(res.data)))
    .catch(e => {});
}

export function fetchMyCoinListMore(page) {
  getMyCoinList(page + 1)
    .then(res => store.dispatch(getMyCoinListMoreAction(res.data)))
    .catch(e => {});
}

export function fetchMyCoinInfo() {
  getMyCoinInfo()
    .then(res => store.dispatch(getMyCoinInfoAction(res.data)))
    .catch(e => {});
}

// 切换应用语言环境
export async function switchAPPLanguage(language) {
  await AuthUtil.saveAppLanguage(language);
  LanguageUtil.locale = language;
  DeviceEventEmitter.emit('switchLanguage');
  store.dispatch(getSwitchAPPLanguageAction(language));
}
