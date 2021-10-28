
import actionTypes from '../actions/actionType'

const initialState = {
    page:0,
    plazaData:[],
}

const plaza = (state = initialState,action) => {
    switch (action.type) {
        case actionTypes.FETCH_PLAZA_CONTENT:
            return {
                // ...state,
                // 这里的action.plazaContent是服务返回的data对象，
                // datas才是我们要到数组数据
                plazaData: action.plazaContent.datas,
                page:state.page++,
            };

        case actionTypes.FETCH_PLAZA_VALUE_FAILURE:
            return state;

        default:
            return initialState;
    }
};

export default plaza;


