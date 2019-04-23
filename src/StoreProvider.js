import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux'
import { StoreContext } from 'redux-react-hook';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
import reducers from 'store/reducers';
import rootSaga from 'store/sagas'

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

const StoreProvider = props => <StoreContext.Provider value={store} children={props.children} />

export default StoreProvider