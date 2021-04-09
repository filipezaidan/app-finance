import React, { useContext, useState, useEffect } from 'react';
import firebase from '../../services/firebaseConection';
import { format } from 'date-fns';

import { Background, Container, Name, Balance, Title, List} from './styles'


import Header from '../../components/Header';
import {AuthContext} from '../../contexts/auth';
import HistoricList from '../../components/HistoricList';

export default function Home() {

  const [historic, sethistoric] = useState([]);
  const [balance, setBalance] = useState(0);

  const { user } = useContext(AuthContext); 
  const uid = user && user.uid;

  useEffect( () => {
    async function loadingList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setBalance(snapshot.val().saldo);
      });

      await firebase.database().ref('historic')
      .child(uid)
      .orderByChild('date').equalTo(format(new Date, 'dd/MM/yy'))
      .limitToLast(10).on('value', (snapshot) => {
        sethistoric([]);

        snapshot.forEach( (childItem) => {
          let list = {
            key: childItem.key,
            type: childItem.val().type,
            value: childItem.val().value,
          }
          sethistoric(oldArray => [...oldArray, list].reverse());
        })
      })
    }

    loadingList();
  }, [])

  return (
   <Background>
     <Header/>

     <Container>
        <Name>{user && user.name}</Name>
        <Balance>R$ {balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Balance>
     </Container>

     <Title>Últimas transações</Title>

     <List
     showsVerticalScrollIndicator={false}
     data={historic}
     keyExtractor={ item => item.key}
     renderItem={ ({ item })  => ( <HistoricList data={item}/>)}
     />

   </Background>
  );
}