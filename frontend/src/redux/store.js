import { combineReducers,applyMiddleware, legacy_createStore } from "redux";
import {thunk} from 'redux-thunk';
import { eventsReducer } from "./reducers/eventReducer";


    const rootReducer = combineReducers({
          events : eventsReducer
    })

    const store = legacy_createStore(
        rootReducer,
        applyMiddleware(thunk)
    )

export default store;