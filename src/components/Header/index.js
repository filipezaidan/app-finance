import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, ButtonMenu } from './styles';
import { Feather } from "@expo/vector-icons"


export default function Header() {
    const navigation = useNavigation();

    return (
    <Container>
        <ButtonMenu onPress={ () => navigation.toggleDrawer() }>
            <Feather name="menu" color="#fff" size={40}/>
        </ButtonMenu>
    </Container>
    );
}