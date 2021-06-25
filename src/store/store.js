import { createStore, combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";

/* Esto se hace para combinar una lista de reducer y así poder pasarselo a la funcion createStore */
const reducersList = combineReducers({
    auth: authReducer
})

export const store = createStore(reducersList, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())