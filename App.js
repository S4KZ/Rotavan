import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

import RouterUser from './componentes/router-User/index';
import RouterMotor from './componentes/router-Motor/index';


import Login from "./pages/log/login";
import Cadastro from "./pages/log/cadastro";
import Sair from "./pages/log/Sair";

const icon = require('./assets/icons/welcome-ilustra.png');



 function Welcome() {
  const navigation = useNavigation();
  return (
      <View style={styles.container}>
          
          <Animatable.Image 
          animation={"flipInY"}
          delay={500}
          Image source={icon} style={styles.image} 
           
          />

 <Animatable.Text  animation={"fadeInLeft"} style={styles.title}>Seja bem-vindo!</Animatable.Text>

          <Text style={styles.text3}>Seja bem-vindo ao RotaVan, cadastre se ou</Text>
          <Text style={styles.text4}>efetue seu login com os dados existentes!</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button2}>
              <Text style={styles.buttonText2}>Login</Text>
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
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Cadastro" component={Cadastro}
                  options={{ headerShown: false }}
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
      backgroundColor:'#fff'
      
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
      borderRadius: 8,
      width: 250,
      backgroundColor: '#1A478A',
      margin: 10,
      marginBottom:10,
  },

  button2: {
    padding: 10,
    borderRadius: 8,
    width: 250,
    backgroundColor: '#F6B628',
},

buttonText2: {
    color: '#1A478A',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
},

  buttonText: {
      color: '#F6B628',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',

  },

  title: { // estilização do text
    fontSize: 25,
    right:80,
    padding: 10,
    textAlign: 'center',
    fontVariant: 'bold',
    fontWeight: 'bold',

},
text3: {
    fontSize: 16,
    fontVariant: 'bold',
    marginright:10,
  
  
},

text4: {
    fontSize: 16,
    fontVariant: 'bold',
    marginBottom:40,
    marginright:10,
},

});

