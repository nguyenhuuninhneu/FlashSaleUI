import { createStore, applyMiddleware } from 'redux'
// import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

// const logger = createLogger({
//     predicate: () => process.env.NODE_ENV !== 'production'
// });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
