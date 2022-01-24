// import { createStore, applyMiddleware } from "redux";
// import rootReducer from "../Reducers/rootReducer";
// import thunk from 'redux-thunk';


// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

// --------FOR DEVELOPMENT ENVIRONMENT------- USING REDUX DEV TOOLS

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../store/rootReducer";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
)
);

export default store;


