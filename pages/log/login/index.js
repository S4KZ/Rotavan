import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

const icon = require('../../../assets/icons/Login-rafiki.png');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    let routeName;
    if (email === 'user' && password === '123') {
      routeName = 'RouterUser';
    } else if (email === 'moto' && password === '123') {
      routeName = 'RouterMotor';
    } else {
      alert('Credenciais inválidas');
      return;
    }

    // Reseta a navegação e navega para a tela do usuário ou motorista
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      })
    );
  };

  return (
    <View style={styles.container}>
        <Image source={icon} style={styles.image} />

      <View style={styles.box}>
      
        <View style={styles.form}>
          <Text style={styles.text}>Email</Text>
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
        </View>

        <View style={styles.form}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#AAAAAA"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={styles.form}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    padding: 40,
    top:40,
    height: 450,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width:0, height:10 },
    shadowRadius: 1.3,
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
  text2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a6d97',
    textDecorationLine: 'underline'
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 250,
    backgroundColor: '#1A478A',
    margin: 10
  },
  buttonText: {
    color: '#F6B628',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 10
  },
  textInput: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
    color: '#333',
  },
});
