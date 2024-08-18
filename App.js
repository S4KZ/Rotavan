import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import RouterUser from './componentes/router-User/index';
import RouterMotor from './componentes/router-Motor/index';


import Login from "./pages/log/login";
import Cadastro from "./pages/log/cadastro";
import Sair from "./pages/log/Sair";

const icon = require('./assets/icons/Login-cuate.png');



 function Welcome() {
  const navigation = useNavigation();
  return (
      <View style={styles.container}>
          
          <Image source={icon} style={styles.image} />
          <Text style={styles.text}>É novo por aqui?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.text2}>Já tenho uma conta</Text>
          </TouchableOpacity>

      </View>
  );
}


export default function App(){
  const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Welcome" 
                component={Welcome} 
                options={{ headerShown: false }}
                />
                <Stack.Screen name="Login" component={Login}
                options={{
                    title: ''
                }}
                />
                <Stack.Screen name="Cadastro" component={Cadastro}
                 options={{
                    title: ''
                }}
                />
                <Stack.Screen name="RouterMotor" component={RouterMotor} 
                options={{ headerShown: false }}
                />
                <Stack.Screen name="RouterUser" component={RouterUser}  
                options={{ headerShown: false }}
                />

              

              
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
  },
  image: {
      height: 350,
      width: 350,
  },
  text: {
      fontSize: 20,
      fontVariant: 'bold',
      fontWeight: 'bold',
  },
  text2:{
      fontSize: 17,
      fontVariant: 'bold',
      fontWeight: 'bold',
      color: '#1a6d97',
      textDecorationLine: 'underline'
  },
  button: {
      padding: 10,
      borderRadius: 20,
      width: 250,
      backgroundColor: '#1A478A',
      margin: 10
  },
  buttonText: {
      color: '#F6B628',
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
  }
});

