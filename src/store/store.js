import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";


/* Esto se hace para combinar una lista de reducer y así poder pasarselo a la funcion createStore */
const reducersList = combineReducers({
    auth: authReducer,
    ui: uiReducer
});

/* Para configurar el middleware para poder realizar peticiones asyncronas*/
const composeEnchancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


/* este será mi fuente unica de la verdad 
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   esto es para activar las redux tools del navegador chrome, no funciona para otro navegador

*/
export const store = createStore(
    reducersList,
    composeEnchancers( applyMiddleware(thunk) )
  );