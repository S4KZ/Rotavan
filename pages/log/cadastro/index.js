import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState('passageiro');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box}>

          <View style={styles.selectContainer}>
            <Picker
              style={styles.pickerBox}
              selectedValue={tipoUsuario}
              onValueChange={(itemValue) => setTipoUsuario(itemValue)}
            >
              <Picker.Item label="Passageiro" value="passageiro" />
              <Picker.Item label="Motorista" value="motorista" />
            </Picker>
          </View>

          <View style={styles.form}>
            <Text style={styles.text}>Nome Completo</Text>
            <TextInput style={styles.textInput} placeholder="Nome Completo" />
          </View>

          <View style={styles.form}>
            <Text style={styles.text}>Data de Nascimento</Text>
            <TextInput style={styles.textInput} placeholder="DD/MM/YYYY" />
          </View>

          <View style={styles.form}>
            <Text style={styles.text}>Celular</Text>
            <TextInput style={styles.textInput} placeholder="Celular" />
          </View>

          <View style={styles.form}>
            <Text style={styles.text}>Gmail</Text>
            <TextInput style={styles.textInput} placeholder="Gmail" />
          </View>

          <View style={styles.form}>
            <Text style={styles.text}>Senha</Text>
            <TextInput style={styles.textInput} placeholder="Senha" secureTextEntry={true} />
          </View>

          <View style={styles.form}>
            <Text style={styles.text}>Confirmar Senha</Text>
            <TextInput style={styles.textInput} placeholder="Confirmar Senha" secureTextEntry={true} />
          </View>

          <View style={styles.form}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 20,
    marginBottom: 20,
  },
  box: {
    padding: 30,
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 15,
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
  },
  form: {
    padding: 10
  },
  textInput: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
    color: '#333',
  },

  selectContainer: {
    padding: 10,
    borderRadius: 10,
    height: 60,
  },
  pickerBox: {
    borderColor: '#021C58',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
};