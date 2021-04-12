import React, { useContext, useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import firebase from '../../services/firebaseConection';
import { format, isPast } from 'date-fns';

import { Background, Container, Name, Balance, Title, List, Area} from './styles'

import Icon from '@expo/vector-icons/MaterialIcons';

import Header from '../../components/Header';
import {AuthContext} from '../../contexts/auth';
import HistoricList from '../../components/HistoricList';
import DatePicker from '../../components/DatePicker';

export default function Home() {

  const [historic, sethistoric] = useState([]);
  const [balance, setBalance] = useState(0);
  const [newdate, setNewDate] = useState(new Date());
  const [showPickerDate, setShowPickerDate] = useState(false);

  const { user } = useContext(AuthContext); 
  const uid = user && user.uid;

  useEffect( () => {
    async function loadingList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setBalance(snapshot.val().saldo);
      });

      await firebase.database().ref('historic')
      .child(uid)
      .orderByChild('date').equalTo(format(newdate, 'dd/MM/yy'))
      .limitToLast(10).on('value', (snapshot) => {
        sethistoric([]);

        snapshot.forEach( (childItem) => {
          let list = {
            key: childItem.key,
            type: childItem.val().type,
            value: childItem.val().value,
            date: childItem.val().date,
          }
          sethistoric(oldArray => [...oldArray, list].reverse());
        })
      })
    }

    loadingList();
  }, [newdate])

  function handleDelete(data){
    if( isPast(new Date(data.date)) ){
      alert('Você não pode excluir um registro antigo!');
      return;
    }

    Alert.alert(
      'Cuidado Atenção',
      `Voce deseja excluir ${data.type} - Valor: ${data.value}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Deletar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
      )

  }

  async function handleDeleteSuccess(data){
    await firebase.database().ref('historic')
    .child(uid).child(data.key).remove()
    .then( async () => {
      let balanceActual = balance;
      data.type === 'despesa' ? balanceActual += parseFloat(data.value) : balanceActual -= parseFloat(data.value);

      await firebase.database().ref('users').child(uid).child('saldo').set(balanceActual);

    })
    .catch( (error) => {
      console.log(error);
    })

  }

  function handleShowPicker(){
    setShowPickerDate(true);
  }

  function onChange(date) {
    setShowPickerDate(false);
    setNewDate(date);
  }

  return (
   <Background>
     <Header/>

     <Container>
        <Name>{user && user.name}</Name>
        <Balance>R$ {balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Balance>
     </Container>

      <Area>
        <TouchableOpacity onPress={ handleShowPicker }>
         <Icon name="event" color="#fff" size={40}/>
        </TouchableOpacity>

        <Title>Últimas transações</Title>
      </Area>

      <List
      showsVerticalScrollIndicator={false}
      data={historic}
      keyExtractor={ item => item.key}
      renderItem={ ({ item })  => ( <HistoricList data={item} deleteItem={handleDelete} /> )}
      />

      {showPickerDate && (
        <DatePicker
        date={newdate}
        onChange={onChange}
        />
      )}

   </Background>
  );
}