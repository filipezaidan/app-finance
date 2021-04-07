import React, { useContext } from 'react';
import { Container, Name, NewLink, NewText, Logout, LogoutText} from './styles';
import { AuthContext } from '../../contexts/auth';

export default function Profile() {

  const { user, signOut} = useContext(AuthContext);

 return (
   <Container>
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