import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInputMask } from 'react-native-masked-text';


export default function User() {
  const navigation = useNavigation();
  const [cell, setCell] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('passageiro');
  const [cnh, setCnh] = useState('');
  const [cpf, setCpf] = useState('');
  const [placa, setPlaca] = useState('');
  return (

    <View style={styles.container}>
      <Text style={styles.title} >Cadastro Motorista </Text>
      <Animatable.View animation={"fadeInUp"} style={styles.box}>
        <View style={styles.form}>
          <TextInputMask style={styles.textInput}
            placeholder="Telefone"
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            value={cell}
            onChangeText={text => setCell(text)}
          />
        </View>
        <View style={styles.form}>
          <TextInputMask
            style={styles.textInput}
            placeholder="CNH"
            type={'custom'}
            options={{
              mask: '99999999999'  // Máscara para CNH (11 dígitos)
            }}
            value={cnh}
            onChangeText={text => setCnh(text)}
          />
        </View>

        <View style={styles.form}>
          <TextInputMask
            style={styles.textInput}
            placeholder="CPF"
            type={'cpf'}
            value={cpf}
            onChangeText={text => setCpf(text)}
          />
        </View>

        {/* <Text style={styles.title} >Cadastro da van</Text>


          <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Modelo"/>
          </View>

            <View style={styles.form}>
            <TextInputMask
        style={styles.textInput}
        placeholder="Placa"
        type={'custom'}
        options={{
          mask: 'AAA-9999', // Formato tradicional
        }}
        value={placa}
        onChangeText={text => setPlaca(text)}
      />
          </View> */}



        <View style={styles.form}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RouterMotor')}>
            <Text style={styles.buttonText}>Entrar</Text>
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
    width: 280,
    height: 43,
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

  title: { // estilização do text
    top: 70,
    fontSize: 28,
    color: '#F6B628',
    right: 40,
    padding: 10,
    textAlign: 'center',
    fontVariant: 'bold',
    fontWeight: 'bold',

  },

  selectContainer: {
    padding: 10,
    borderRadius: 10,
    height: 60,
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
  form: {
    padding: 10
  },
  // textInput: {
  //   height: 40,
  //   borderColor: '#CCCCCC',
  //   borderWidth: 1,
  //   borderRadius: 7,
  //   paddingHorizontal: 10,
  //   paddingVertical: 10,
  //   fontSize: 16,
  //   color: '#333',
  // },

  pickerBox: {
    borderColor: '#021C58',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },

};