import React, {useState} from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Header from '../../components/Header';
import Picker from '../../components/Picker';

import { Background, Input, SubmitButton, SubmitText } from './styles';

export default function New() {
  const [value, setValue] = useState('');
  const [type, setType] = useState('receitas');

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
    
            <SubmitButton>
              <SubmitText>Registrar</SubmitText>
            </SubmitButton>

          </SafeAreaView>
        </Background>
    </TouchableWithoutFeedback>
    
  );
}