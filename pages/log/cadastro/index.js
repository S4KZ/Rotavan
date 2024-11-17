import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import User from './cadastro-user';
import Mot from './cadastro-mot';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const navigation = useNavigation();

  const validatePasswords = () => {
    setIsValid(password === confirmPassword);
  };

  const handleNavigateToSpecificScreen = (screen) => {
    if (!nome || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de continuar.');
      return;
    }
  
    // Validação das senhas ao tentar continuar
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
  
    // Envia os dados do cadastro inicial para a tela específica
    navigation.navigate(screen, {
      cadastroInicial: { nome, email, password },
    });
  };

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation={"fadeInLeft"}
        delay={500}
        style={styles.title}>
        Bem-vindo(a)
      </Animatable.Text>

      <Animatable.View animation={"fadeInUp"} style={styles.box}>
        {/* Nome */}
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
          />
          <Icon name="user" size={25} color="#1A478A" style={styles.icon} />
        </View>

        {/* Email */}
        <View style={styles.form}>
          <TextInput
            style={[styles.textInput, !isValid && { borderColor: 'red' }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Icon name="at" size={23} color="#1A478A" style={styles.icon} />
        </View>

        {/* Senha */}
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePasswords();  // Isso ainda valida na digitação
            }}
            secureTextEntry={true}
          />
          <Icon name="lock" size={23} color="#1A478A" style={styles.icon} />
        </View>

        {/* Confirmar Senha */}
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validatePasswords();
            }}
            secureTextEntry={true}
          />
          <Icon name="lock" size={23} color="#1A478A" style={styles.icon} />
        </View>

        {/* Botão para abrir o modal */}
        <TouchableOpacity
          style={[styles.button2, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Modal de Escolha */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeIconText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>Você é motorista de uma van?</Text>

              {/* Botão "Sim" para Motorista */}
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleNavigateToSpecificScreen('Mot')}>
                <Text style={styles.buttonText}>Sim</Text>
              </TouchableOpacity>

              {/* Botão "Não" para Usuário */}
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleNavigateToSpecificScreen('User')}>
                <Text style={styles.buttonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    position: 'absolute',
    left: 22,
    top: 32,
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
    top: 150,
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
    flex: 1,
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
    height: 53,
    backgroundColor: '#1A478A',
    marginBottom: 10,
  },


  button2: {
    padding: 10,
    borderRadius: 10,
    width: 295,
    height: 45,
    left: 15,
    top: 30,
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

    justifyContent: 'center'
  },
  textInput: {
    height: 50,
    width: 300,
    backgroundColor: '#f4f4f4',
    borderRadius: 7,
    paddingHorizontal: 40,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    top: 10,
  },

  title: {
    top: 90, // estilização do text
    fontSize: 28,
    color: '#F6B628',
    right: 80,
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
    fontSize: 18,
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
