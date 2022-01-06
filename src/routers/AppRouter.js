import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();

    /*  chekingLogin: usada para verificar si le pregunté a firebase si hay alguien logueado, mientras sea true no voy a mostrar nada mas de la app por no estoy seguro si engo un usuario en session */
    const [chekingLogin, setchekingLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /*onAuthStateChanged  Me permite crear un observable para estar al pendiente de la autenticación del usuario, si esta cambia
       veré el cambio al toque gracias al observable.
       onAuthStateChanged: me permite obtener la informacion del usuario en sesion, de no haber ninguno retorna null.*/
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if ( user?.uid ) { // si user no es nulo
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn(true) // me permitirá saber cuando tenga un usuario logueado
                dispatch( startLoadingNotes(user.uid) );
            } else {
                setIsLoggedIn(false)
            }
            setchekingLogin(false); // si onAuthStateChanged respondió, ojo que no es para saber si alguien está logueado, es para verificar si fuí a firebase
        })
    }, [dispatch, setchekingLogin, setIsLoggedIn]); // las coloco como dependencias para no ver el error por consola, pero en sí, no cambiaran


    if( chekingLogin ){ // mientras valido si tengo un usuario en sesion mostrare este componente

        return (
            <h1> Wait...  </h1>
        )

    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                            isAutenticated = { isLoggedIn }
                            path="/auth"
                            component={ AuthRouter }
                    />
                    <PrivateRoute
                            exact
                            isAutenticated = { isLoggedIn }
                            path="/"
                            component={ JournalScreen }
                    />

                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
