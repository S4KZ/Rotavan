import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import AppIntroSlider from 'react-native-app-intro-slider';

import Login from "./pages/log/login";
import Cadastro from "./pages/log/cadastro";
import RouterUser from './componentes/router-User/index';
import RouterMotor from './componentes/router-Motor/index';

// Definição dos slides
const slides = [
  {
    key: '1',
    title: "Seja bem-vindo",
    text: " Seja bem-vindo ao RotaVan, cadastre-se ou efetue seu login com os dados existentes",
    image: require('./assets/icons/welcome-ilustra.png')
  },
  {
    key: '2',
    title: "Facilidade no uso",
    text: " Cadastre-se e comece a usar o aplicativo para gerenciar seu transporte de forma eficiente",
    image: require('./assets/icons/yellow.png')
  },
  {
    key: '3',
    title: "Acompanhe seu trajeto",
    text: " Veja o status dos seus trajetos e planeje seus horários de forma prática!",
    image: require('./assets/icons/map.png')
  }
];

function Welcome() {
  const navigation = useNavigation();
  const [showHome, setShowHome] = useState(false);

  // Renderiza cada slide
  const renderSlide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  // O que acontece após o último slide (quando o slider acaba)
  const onDone = () => {
    setShowHome(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Slider com os slides */}
      <View style={styles.sliderContainer}>
        <AppIntroSlider
          renderItem={renderSlide}
          data={slides}
          onDone={onDone}
          showSkipButton={false} // Remove o botão de pular
          dotStyle={styles.dotStyle} // Estilo das bolinhas inativas
          activeDotStyle={styles.activeDotStyle} // Estilo das bolinhas ativas
          showDoneButton={false} // Remove o botão "Done" para manter os botões de login/cadastro
        />
      </View>

      {/* Botões de Cadastro e Login */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button2}>
          <Text style={styles.buttonText2}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    backgroundColor: '#fff',
  },
  sliderContainer: {
    flex: 4, // Área dedicada ao slider (parte superior da tela)
  },
  buttonsContainer: {
    flex: 1, // Área para os botões (parte inferior)
    justifyContent: 'center',
    alignItems: 'center',
    bottom:20
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: 350,
    width: 350,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1A478A',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#333',
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
  buttonText: {
    color: '#F6B628',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#1A478A',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotStyle: {
    backgroundColor: '#C4C4C4', // Bolinhas inativas (cinza claro)
  },
  activeDotStyle: {
    backgroundColor: '#1A478A', // Bolinhas ativas (azul escuro)
  },
});
