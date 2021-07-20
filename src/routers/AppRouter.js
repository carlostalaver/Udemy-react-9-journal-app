import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();


    const [chekingLogin, setchekingLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /* Me permite crear un observable para estar al pendiente de la autenticación del usuario, si esta cambia
       veré el cambio al toque gracias al observable.
    */
    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            if(user?.uid){
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn(true)
            }else {
                setIsLoggedIn(false)
            }
            setchekingLogin(false); // me permitirá saber cuando tenga un usuario en logueado
        } )
    }, [dispatch, setchekingLogin, setIsLoggedIn]);


    if(chekingLogin){

        return (
            <h1> Espere ...  </h1>
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
