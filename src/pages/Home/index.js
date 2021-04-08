import React, { useContext, useState } from 'react';

import { Background, Container, Name, Balance, Title, List} from './styles'


import Header from '../../components/Header';
import {AuthContext} from '../../contexts/auth';
import HistoricList from '../../components/HistoricList';

export default function Home() {


  const [historic, sethistoric] = useState([
    {key: '1', type: 'receita', value: 1300},
    {key: '2', type: 'receita', value: 1300},
    {key: '3', type: 'receita', value: 1300},
    {key: '4', type: 'despesa', value: 1300},
    {key: '5', type: 'receita', value: 1300},
    {key: '6', type: 'receita', value: 1300},
    {key: '7', type: 'receita', value: 1300},
    {key: '8', type: 'receita', value: 1300},
  ]);

  const { user } = useContext(AuthContext); 

  return (
   <Background>
     <Header/>

     <Container>
        <Name>{user && user.name}</Name>
        <Balance>R$ 2.000</Balance>
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