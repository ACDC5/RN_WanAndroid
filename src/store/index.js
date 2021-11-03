/**
 * Created by hjs on 2019-09-17
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//所有reducer统一集成在此文件中
// (想要多个reducers成功被store使用，需使用redux的一个集成函数)
import rootReducer from '../reducers';

//redux的Store层
const index = createStore(rootReducer, applyMiddleware(thunk));
export default index;
