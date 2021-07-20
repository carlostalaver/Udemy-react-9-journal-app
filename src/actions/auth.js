import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types'
import { finishLoading, startLoading } from './ui';

import Swal from 'sweetalert2'

//ACCIONES ASINCRONAS
export const startLoginEmailPaswords = (email, password) => {
    // debe retornar un callback, entonces cuando el middleware recibe una accion que retorna un callback esperara a resolverlo
    return (dispatch) => {

        dispatch( startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                dispatch(login(user.uid, user.displayName));
                dispatch( finishLoading() );
            })
            .catch((e) => {
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })
    }
}

/* Action para iniciar sesion con google */
export const startGoogleLogin = () => {

    return (dispatch) => { // thunk me entrega este dispatch
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            })
    }

}

/* Accion para crear un nuevo usuario en firebase */
export const startRegisterWhitEMailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                
                await user.updateProfile({ displayName: name }); // si no hago esto la prop displayName vendrá vacia ya que no estoy usando una red solcial para crear el usuario

                dispatch(login(user.uid, user.displayName));
            })
            .catch((e) => {

                Swal.fire('Error', e.message, 'error');

            })
    }
}

export const startLogout = () => {
    return async (dispatch) => {
       await firebase.auth().signOut();

       dispatch( logout() );
    }
}


// ACCIONES SINCRONAS
/* esta accion no es mas una simple funcion que me retorna un obj con 2 propiedades: type y payload */
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const logout = () => ({
    type: types.logout
})