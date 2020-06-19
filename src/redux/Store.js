import { createStore, combineReducers } from 'redux';
import Profile from './reducers/Profile.js';
import Tests from './reducers/Tests.js';

const Store = createStore(combineReducers({ Profile, Tests }), {});

export default Store;
