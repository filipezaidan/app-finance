import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Background, 
  Container, 
  Logo, 
  AreaInput,
  Input, 
  SubmitButton, 
  SubmitText, 
  Link, 
  LinkText
} from './styles';

import { AuthContext } from '../../contexts/auth';

export default function SignIn() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);


  function handleSignIn(){
    signIn(email, password);
  }

 return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? "padding" : ""} enable>
        <Logo source={require('../../assets/Logo.png')}/>
    
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
          />
        </AreaInput>

        <SubmitButton onPress={handleSignIn}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={ () => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>

      </Container>
    </Background>
  );
}