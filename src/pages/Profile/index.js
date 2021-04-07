import React, { useContext } from 'react';
import { Container, Name, NewLink, NewText, Logout, LogoutText} from './styles';
import { AuthContext } from '../../contexts/auth';

import Header from '../../components/Header';

export default function Profile() {

  const { user, signOut} = useContext(AuthContext);

  return (
    <Container>
      <Header/>
      <Name>{user && user.name}</Name>

      <NewLink>
        <NewText>Registrar</NewText>
      </NewLink>

      <Logout onPress={ () => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>

    </Container>
    );
}