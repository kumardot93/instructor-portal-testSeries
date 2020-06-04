import { createStore, combineReducers } from 'redux';
import Profile from './reducers/Profile.js';
import Material from './reducers/Material.js';

const Store = createStore(combineReducers({ Profile, Material }), {});

export default Store;
