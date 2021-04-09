import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';

//Criar um style global para otimizaçao do código
import { 
  Background, 
  Container,  
  AreaInput,
  Input, 
  SubmitButton, 
  SubmitText, 
} from '../SignIn/styles';

export default function SignUp() {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSignUp(){
    signUp(name, email, password);
  }

 return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? "padding" : ""} enable >

        <AreaInput>
          <Input 
            placeholder="Nome"
            autoCorret={true}
            autoCapitalize="none"
            value={name}
            onChangeText = { (text) => setName(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input 
            placeholder="Email"
            autoCorret={false}
            autoCapitalize="none"
            value={email}
            onChangeText = { (text) => setEmail(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorret={false}
            autoCapitalize="none"
            value={password}  
            onChangeText = { (text) => setPassword(text) }
            secureTextEntry = {true}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? <ActivityIndicator size={20} color="#fff" /> : <SubmitText>Cadastrar</SubmitText> }
        </SubmitButton>

      </Container>
    </Background>
  );
}