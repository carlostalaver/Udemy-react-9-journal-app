import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";


/* Esto se hace para combinar una lista de reducer, en este proyecto solo tengo 3: authReducer, uiReducer y notesReducer.
   De esta manera puedo pasarselo a la funcion createStore */
const reducersList = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

/* Para configurar el middleware para poder realizar peticiones asyncronas*/
const composeEnchancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


/* este será mi fuente unica de la verdad,  el store trae entre otras funcionalidades, observables, que me
   permiten estar al pendiente de cambios.
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   esto es para activar las redux tools del navegador chrome, no funciona para otro navegador.

   El store lo exporto porque este debe ser proveido desde un componente de orden superior, ej JournalApp.js
   thunk: es un middleware usado para procesar llamadas asincronas
   */
export const store = createStore(
    reducersList,
    composeEnchancers( applyMiddleware(thunk) )
  );