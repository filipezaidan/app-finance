import React, { useState, useContext } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns';
import firebase from '../../services/firebaseConection';

import { AuthContext } from '../../contexts/auth';

import Header from '../../components/Header';
import Picker from '../../components/Picker';

import { Background, Input, SubmitButton, SubmitText } from './styles';

export default function New() {
  const navigation = useNavigation();

  const [value, setValue] = useState('');
  const [type, setType] = useState(null);
  const {user: usuario} = useContext(AuthContext);

  //Confirmação de dados
  function handleSubmit(){
    Keyboard.dismiss();
    if(isNaN( parseFloat(value)) || type === null ){
      alert('Preencha todos os campos!')
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo${type} - Valor ${parseFloat(value)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )

  }

  async function handleAdd(){
    let uid = usuario.uid;

    //Gerar key
    let key = await firebase.database().ref('historic').child(uid).push().key;

    //Cadastrar receita ou despesa no historic
    await firebase.database().ref('historic').child(uid).child(key).set({
      type: type,
      value: parseFloat(value),
      date: format(new Date(), 'dd/MM/yy')
    })

    // Atualizar o saldo
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then( (snapshot) => {
      let balance = parseFloat(snapshot.val().saldo);

      type === 'despesa' ? balance -= parseFloat(value) : balance += parseFloat(value);

      user.child('saldo').set(balance);

    })
    Keyboard.dismiss();
    setValue('');
    navigation.navigate('Inicio')
  }

  return (
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
      <Background>
          <SafeAreaView style={{ alignItems: 'center'}}>
            <Header/>
            <Input 
              placeholder="Valor R$"
              keyboardType="numeric"
              returnKeyType="next"
              value={value}
              onSubmitEditing={ () => Keyboard.dismiss() }
              onChangeText= { (text) => setValue(text) }  
            />

            <Picker onChange={setType} type={type} />
    
            <SubmitButton onPress={ () => handleSubmit()}>
              <SubmitText>Registrar</SubmitText>
            </SubmitButton>

          </SafeAreaView>
        </Background>
    </TouchableWithoutFeedback>
    
  );
}