import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const JournalApp = () => {

    /* pongo el store para que esté disponible para toda la aplicacion */
    return (
        <Provider  store = { store }> 
            <AppRouter />
        </Provider>
    )
}
