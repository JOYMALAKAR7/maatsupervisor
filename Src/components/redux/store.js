import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; 
import SagaData from './saga';
import createSagaMiddlewere from 'redux-saga'
const SagaMiddlewere=createSagaMiddlewere();
      
const store=configureStore({
    reducer:rootReducer,
    middleware:()=>[SagaMiddlewere]
})
SagaMiddlewere.run(SagaData)
export default store;                                                                                                           