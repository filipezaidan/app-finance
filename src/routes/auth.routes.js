import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import SigIn from '../pages/SigIn';


const AuthStack = createStackNavigator();

export default function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Sign" component={SigIn}/>
        </AuthStack.Navigator>

    );
}