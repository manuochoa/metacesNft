import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';


let reducers = combineReducers({

})

let store = createStore(reducers, applyMiddleware(thunkMiddleWare, multi))

window.store = store

export default store