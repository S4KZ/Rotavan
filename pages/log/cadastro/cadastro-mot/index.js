import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import config from '../../../../config/config.json';

export default function DriverScreen({ route }) {
  const navigation = useNavigation();
  const [cell, setCell] = useState('');
  const [cnh, setCnh] = useState('');
  const [cpf, setCpf] = useState('');
  const cadastroInicial = route.params.cadastroInicial; // Dados do cadastro inicial


  const limparCampos = (valor) => {
    return valor.replace(/\D/g, ''); // Remove tudo que não for número
  };
  // console.log("Dados iniciais: ",cadastroInicial)
  const tipoUsuario = "motorista"
  const dadosIniciais = cadastroInicial
  const handleSubmit = async () => {
    const dadosEspecificos = {
      cnh: limparCampos(cnh),
      cpf: limparCampos(cpf),
      telefone: limparCampos(cell)
    };
    console.log("dados especificos: ", dadosEspecificos); 
    try {
      const response = await fetch(config.urlRootNode + '/cadastrar-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dadosEspecificos, dadosIniciais, tipoUsuario}),
      });

      const data = await response.json();
      if (data.success) {
        alert('Cadastro realizado com sucesso!');
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('Welcome');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro Motorista</Text>
      <Animatable.View animation="fadeInUp" style={styles.box}>
        <View style={styles.form}>
          <TextInputMask
            style={styles.textInput}
            placeholder="Telefone"
            type="cel-phone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            value={cell}
            onChangeText={setCell}
          />
        </View>
        <View style={styles.form}>
          <TextInputMask
            style={styles.textInput}
            placeholder="CNH"
            type="custom"
            options={{ mask: '999999999' }}
            value={cnh}
            onChangeText={setCnh}
          />
        </View>
        <View style={styles.form}>
          <TextInputMask
            style={styles.textInput}
            placeholder="CPF"
            type="cpf"
            value={cpf}
            onChangeText={setCpf}
          />
        </View>
        <View style={styles.form}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  box: {
    top: 130,
    padding: 38,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.7,
    shadowSpread: 5,
    elevation: 15,
    flex: 1,
  },
  title: {
    top: 70,
    fontSize: 28,
    color: '#F6B628',
    right: 40,
    padding: 10,
    textAlign: 'center',
    fontVariant: 'bold',
    fontWeight: 'bold',
  },
  form: {
    padding: 10,
  },
  textInput: {
    height: 50,
    width: 300,
    margin: 1,
    borderColor: '#CCCCCC',
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f4f4f4',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 280,
    height: 50,
    backgroundColor: '#1A478A',
    margin: 10,
  },
  buttonText: {
    color: '#F6B628',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
};
