import React, { useContext } from 'react';
import firebase from "firebase/app"
import "firebase/auth"
import firebaseConfig from './firebase-auth.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
 }else {
    firebase.app(); // if already initialized, use that one
 }


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser ={ name: displayName, email}
            // console.log(signedInUser)
            setLoggedInUser(signedInUser)
            storeAuthToken()
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
  });

    }
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            console.log(idToken)
            sessionStorage.setItem('Token', idToken)
            history.replace(from)
          })
          .catch(function(error) {
            // Handle error
          });
    }
    return (
        <div>
            <h1>This is login</h1>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
        </div>
    );
};

export default Login;