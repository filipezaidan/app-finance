import React, {useState, useEffect ,createContext} from 'react';
import firebase from '../services/firebaseConection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export default function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect( () => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);

        }
        loadStorage();
    }, [])

    //Logar usuário
    async function signIn(email, password) {
        setLoadingAuth(true);

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
                setLoadingAuth(false);
            })
        })
        .catch( (error) => {
            alert(error.code);
            setLoadingAuth(false);
        })
    }

    //Criar usuário no database 
    async function signUp( name, email, password) {
        setLoadingAuth(true);


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
                setLoadingAuth(false);

            })
        }).catch( (error) => {
            alert(error.code);
            setLoadingAuth(false);
        })
    }

    //Armazena data no AsyncStorage
    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }


    //Desloga do firebase e limpa AsyncStorage
    async function signOut(){
        await firebase.auth().signOut();
        await AsyncStorage.clear()
        .then( () => {
            setUser(null);
        })
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, loadingAuth, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}