import React, { useContext } from 'react';
import { View, Text} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Container, Logo, Welcome, UserName} from   './styles';


import { AuthContext } from '../../contexts/auth'

export default function CustomDrawer(props) {
    const { user, signOut } = useContext(AuthContext);

    return (
    <DrawerContentScrollView {...props}>
        <Container>
            <Logo
            source={require('../../assets/Logo.png')}
            resizeMode="contain"
            />

            <Welcome>Bem-Vindo!</Welcome>
            <UserName>{user && user.name}
            </UserName>

        </Container>

        <DrawerItemList {...props} />

        <DrawerItem {...props}
        label='Sair do App'
        inactiveBackgroundColor='#c62c36'
        onPress={ () => signOut() }
        >

        </DrawerItem>

    </DrawerContentScrollView>
    );
}