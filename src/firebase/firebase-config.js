import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDa2XIj98Dd4nLViETDEL2mzYNdUzDjCNQ",
    authDomain: "react-app-curso-udemy-fh.firebaseapp.com",
    projectId: "react-app-curso-udemy-fh",
    storageBucket: "react-app-curso-udemy-fh.appspot.com",
    messagingSenderId: "642226647533",
    appId: "1:642226647533:web:aa3b17c30ff91034ca77e4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const bd = firebase.firestore();
const googleAuthProvider =  new firebase.auth.GoogleAuthProvider();


export {
    bd,
    googleAuthProvider,
    firebase
}
