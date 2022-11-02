import { createStore } from "redux";
import { combineReducers } from "redux";
import toDosReducer from '../modules/todos';

const rootReducer = combineReducers({
    toDos: toDosReducer
});
const store = createStore(rootReducer);

export default store;