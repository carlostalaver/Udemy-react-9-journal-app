import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const JournalApp = () => {

    /* pongo el store para que esté disponible para toda la aplicacion
       para instalaar redux: npm install react-redux redux
       Libreria para gestionar validaciones de formulario: npm i validator, https://www.npmjs.com/package/validator
    */
    return (
        <Provider  store = { store }> {/* Provider es un componente de orden superior propio de react */}
            <AppRouter />
        </Provider>
    )
}
