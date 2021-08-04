import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {  persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer'

const middleWares = [thunk,logger]
const persistConfig = {
  key: 'root',
  storage
}
const persisReducer = persistReducer(persistConfig, rootReducer)
const store =  createStore(
    persisReducer,
  {},
    
    compose(applyMiddleware(...middleWares),
    process.env.NODE_ENV !== 'production' &&   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
let persistore = persistStore(store);



export  { store, persistore };
