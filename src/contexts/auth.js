import React, {useState, useEffect ,createContext} from 'react';
import firebase from '../services/firebaseConection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export default function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    useEffect( () => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if(storageUser){
                setUser(JSON.parse(storageUser));
            }
        }
        loadStorage();
    }, [])

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
                storageUser(data);
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
                storageUser(data);
            })
        } )
    }

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}