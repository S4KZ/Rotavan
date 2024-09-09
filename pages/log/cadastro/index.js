import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, button, Alert, } from 'react-native';
import {  useNavigation } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
 import { BlurView } from '@react-native-community/blur';


import User from './cadastro-user';
import Mot from './cadastro-mot';


 function Cadastro() {
  const [cell, setCell] = useState('');
   const [tipoUsuario, setTipoUsuario] = useState('passageiro');
   const [modalVisible, setModalVisible] = useState(false);
   const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


   const [email, setEmail] = useState('');
   const [isValid, setIsValid] = useState(true); 

   const validateEmail = (text) => {
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValid(emailRegex.test(text));
    setEmail(text);
  };

  

    const validatePasswords = (passwordValue, confirmPasswordValue) => {
      setPassword(passwordValue);
      setConfirmPassword(confirmPasswordValue);
      setIsValid(passwordValue === confirmPasswordValue);
    };

  const navigation = useNavigation();

  return (
 
      <View style={styles.container}>
        
        <Animatable.Text 
        animation={"fadeInLeft"}
        delay={500}
        style={styles.title}>Bem-vindo(a)</Animatable.Text>


        <Animatable.View 
         animation={"fadeInUp"}  
          style={styles.box}>

          <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder=" Nome completo"  />
            <Icon name="user" size={25} color="#1A478A" style={styles.icon} />
          </View>

      
          <View style={styles.form}>
           
            <TextInput
        style={[styles.textInput, !isValid && { borderColor: 'red' }]}
        placeholder="Email"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
      />
      {!isValid && <Text style={styles.errorText}>Forma inválida</Text>}

      <Icon name="at" size={23} color="#1A478A" style={styles.icon} />
          </View>




          <View style={styles.form}>
         
          
       {/* Campo de Senha */}
      <TextInput
        style={[styles.textInput, !isValid && { borderColor: 'red' }]}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      
<Icon name="lock" size={23} color="#1A478A" style={styles.icon} />
        </View>

      <View style={styles.form}>
      {/* Campo de Confirmar Senha */}
      <TextInput
        style={[styles.textInput, !isValid && { borderColor: 'red' }]}
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}

      />
      <Icon name="lock" size={23} color="#1A478A" style={styles.icon} />

      {/* Mensagem de Erro */}
      {!isValid && <Text style={styles.errorText}>As senhas não coincidem</Text>}
          </View>


          <TouchableOpacity
        style={[styles.button2, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

          {/* <View style={styles.form}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View> */}

  <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('A janela foi fechada.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            
          <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeIconText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Você é motorista de uma van?</Text>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.navigate('Mot')}>
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>

              <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.navigate('User')}>
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>
{/* 
          </View>
        </View> */}
        </View>
        </View>
      </Modal>
     
    </View>


        </Animatable.View>


      </View>

 
  );
}


export default function Telas() { 
    const Stack = createNativeStackNavigator();
    return (

        <Stack.Navigator>
            <Stack.Screen name="Cadastro" component={Cadastro}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="Mot" component={Mot}
                options={{ headerShown: false }}
            />

            
            <Stack.Screen name="User" component={User}
                options={{ headerShown: false }}
            />

          
        </Stack.Navigator>

    );
}


const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A478A',
    marginBottom: 10,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  icon: {
    position:'absolute',
    left:22,
    top:32,
},
overlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Fundo preto com opacidade de 50%
  justifyContent: 'center',
  alignItems: 'center',

},
modalContainer: {
  width: '84%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 5,
},
closeIcon: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'transparent', // pode ser transparente ou com cor de fundo
  padding: 5,
},
closeIconText: {
  fontSize: 23,
  fontWeight: 'bold',
  color: '#333',
},
  box: {
    top:150,
    padding: 38,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 15,
    flex:1,
  },

  image: {
    height: 250,
    width: 270,
  },
  text: {
    fontSize: 20,
    fontVariant: 'bold',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 17,
    fontVariant: 'bold',
    fontWeight: 'bold',
    color: '#1a6d97',
    textDecorationLine: 'underline'
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 250,
    height:53,
    backgroundColor: '#1A478A',
    marginBottom: 10,
  },


  button2: {
    padding: 10,
    borderRadius: 10,
    width: 295,
    height:45,
    left:15,
    top:30,
    backgroundColor: '#1A478A',
  },
    
  buttonText: {
    color: '#F6B628',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 10,

    justifyContent:'center'
  },
  textInput: {
    height: 50,
    width:300,
    backgroundColor: '#f4f4f4',
    borderRadius: 7,
    paddingHorizontal: 40,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    top:10,
  },

  title: {
    top:90, // estilização do text
    fontSize: 28,
    color: '#F6B628',
    right:80,
    padding: 10,
    textAlign: 'center',
    fontVariant: 'bold',
    fontWeight: 'bold',

},
   modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
    modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:18,
    fontWeight: 'bold',

  },

   textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  
};