import { combineReducers } from 'redux';
import { listData } from './Blog/reducer';
import { alertData } from './Alert/reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitellist: ['lists', 'alert']
}

const rootReducer = combineReducers({
    lists: listData,
    alert: alertData
});

export default persistReducer(persistConfig, rootReducer);  