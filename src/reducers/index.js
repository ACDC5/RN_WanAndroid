/**
 * Created by hjs on 2019-09-17
 */
import {combineReducers} from 'redux';
import home from './home';
import user from './user';
import system from './system';
import wxArticle from './wxArticle';
import guide from './guide';
import project from './project';
import search from './search';
import collect from './collect';
import coin from './coin';
import plaza from './plaza'
// 合并多个reducers为一个总的reducer
export default combineReducers({
  home,//当对象的key:value同名，可以只写一个(对象简写形式)
  user,
  system,
  wxArticle,
  guide,
  project,
  search,
  collect,
  coin,
  plaza,
});
