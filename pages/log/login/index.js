import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../../config/config.json';
const icon = require('../../../assets/icons/Login-rafikii.png');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function handleLogin() {
    try {
      let reqs = await fetch(config.urlRootNode + '/log', {
        method: 'POST',
        headers: {
          'Accept': 'application/json', // Corrigido o typo de 'Accpet' para 'Accept'
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tryEmail: email,
          tryPassword: password
        })
      });

      let ress = await reqs.json();
      const useId = ress.id;

      if (ress.tipo) {
        let routeName;
        let params = { id: useId }; // Passa o ID como parte dos parâmetros

        if (ress.tipo === 'motorista') {
          routeName = 'RouterMotor';
        } else if (ress.tipo === 'passageiro') {
          routeName = 'RouterUser';
        }

        // Reseta a navegação e passa o ID por parâmetro
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routeName, params: params }],
          })
        );
      } else {
        alert(ress.error);
      }
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao tentar fazer login.');
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.Image source={icon} animation={"fadeInLeft"} style={styles.image} />
      <Animatable.View animation={"fadeInUp"} delay={500} style={styles.box}>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#AAAAAA"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Icon name="at" size={23} color="#1A478A" style={styles.icon} />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            placeholderTextColor="#AAAAAA"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Icon name="lock" size={23} color="#1A478A" style={styles.icon} />
        </View>
        <View style={styles.form}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  box: {
    padding: 40,
    top: 40,
    maxWidth: 800,
    minWidth: 400,
    height: 500,
    maxHeight: 600,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    elevation: 20,
  },
  image: {
    height: 250,
    width: 270,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#1A478A',
    width: 295,
    height: 45,
    top: 20,
  },
  buttonText: {
    color: '#F6B628',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    padding: 10
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
  icon: {
    position: 'absolute',
    left: 22,
    top: 32,
  },
});
