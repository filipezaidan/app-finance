import React, { useState} from 'react';
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

export default function SigIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 return (
    <Background>
      <Container>
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

        <SubmitButton>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link>
          <LinkText>Criar uma conta!</LinkText>
        </Link>

      </Container>
    </Background>
  );
}