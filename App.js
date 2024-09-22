import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import AppLoading from 'expo-app-loading'; // Importar o AppLoading

import RouterUser from './componentes/router-User/index';
import RouterMotor from './componentes/router-Motor/index';

import Login from "./pages/log/login";
import Cadastro from "./pages/log/cadastro";
import Sair from "./pages/log/Sair";

const icon = require('./assets/icons/welcome-ilustra.png'); // Verifique o caminho do ícone

function Welcome() {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);

  // Simula o carregamento de recursos
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 6000); // Simula 3 segundos de carregamento
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <Image 
          source={require('./assets/icons/entradaRotavan.gif')} // Verifique se o caminho está correto
          style={styles.gif}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animatable.Image 
        animation={"flipInY"}
        delay={500}
        source={icon}
        style={styles.image} 
      />

      <Animatable.Text animation={"fadeInLeft"} delay={500}  style={styles.title}>
        Seja bem-vindo!
      </Animatable.Text>

      <Animatable.Text animation={"fadeInLeft"}  delay={500} style={styles.text3}>
        Seja bem-vindo ao RotaVan, cadastre-se ou
      </Animatable.Text>
      <Animatable.Text animation={"fadeInLeft"} delay={500} style={styles.text4}>
        efetue seu login com os dados existentes!
      </Animatable.Text>

      <TouchableOpacity   onPress={() => navigation.navigate('Cadastro')} style={styles.button}>
        <Animatable.Text animation={"flipInY"} delay={500}style={styles.buttonText}>
          Cadastrar
        </Animatable.Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button2}>
        <Animatable.Text animation={"flipInY"} delay={500} style={styles.buttonText2}>
          Login
        </Animatable.Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RouterMotor" 
          component={RouterMotor} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RouterUser" 
          component={RouterUser}  
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff',
  },
  loadingContainer: { // Novo estilo para a tela de loading com o GIF
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  gif: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
  image: {
    height: 350,
    width: 350,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    width: 250,
    backgroundColor: '#1A478A',
    margin: 10,
    marginBottom: 10,
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
  title: {
    fontSize: 25,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 16,
    textAlign: 'left',
  },
  text4: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'left',
  },
});
