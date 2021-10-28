/**
 * Created by hjs on 2019-09-17
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//所有reducer统一集成在此文件中
import rootReducer from '../reducers';

//reducer的Store层
const index = createStore(rootReducer, applyMiddleware(thunk));
export default index;
