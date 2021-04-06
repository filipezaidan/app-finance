import React, {useState, createContext} from 'react';
import { SnapshotViewIOSComponent } from 'react-native';

import firebase from '../services/firebaseConection';

export const AuthContext = createContext({});

export default function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    //Logar usuário
    async function signIn(email, password) {
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then( async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then( (snapshot) => {
                let data = {
                    uid: uid,
                    name: snapshot.val().name,
                    email: value.user.email,
                }
                setUser(data);
            })
        })
        .catch( (error) => {
            console.log(error.code);
        })
    }

    //Criar usuário no database 
    async function signUp( name, email, password) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                name: name,
            }).then( () => {
                let data = {
                    uid: uid,
                    name: name,
                    email: email
                }
                setUser(data);
            })
        } )
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}