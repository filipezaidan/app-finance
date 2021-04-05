import 'react-native-gesture-handler';
import React from 'react';
import { View, Text,} from 'react-native';

import firebase from './src/services/firebaseConection';
import Routes from './src/routes';


export default function App() {
 return (
   <View>
     <Routes/>
   </View>

 );
}