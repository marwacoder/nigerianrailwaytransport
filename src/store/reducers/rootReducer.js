import { combineReducers } from 'redux';

import isAuthenticated from './authReducer';
import train from './trainReducer';
import profile from './profileReducer';
import booking from './booking'


 const reducers = {
   isAuthenticated,
   train,
   profile,
   booking
};


const rootReducer = combineReducers({
  ...reducers,
});


export default rootReducer;
