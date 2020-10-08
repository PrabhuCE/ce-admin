import { combineReducers } from 'redux';
import { listData } from './Blog/reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitellist: ['lists']
}

const rootReducer = combineReducers({
    lists: listData
});

export default persistReducer(persistConfig, rootReducer);