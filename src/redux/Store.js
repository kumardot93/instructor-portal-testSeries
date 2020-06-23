import { createStore, combineReducers } from 'redux';
import Profile from './reducers/Profile.js';
import TestSeries from './reducers/TestSeries.js';

const Store = createStore(combineReducers({ Profile, TestSeries }), {});

export default Store;
