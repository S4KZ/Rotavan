import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {  useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import User from './cadastro-user';
import Mot from './cadastro-mot';


 function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState('passageiro');
   const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  return (
 
      <View style={styles.container}>
        
        <View style={styles.box}>
 
        <Text style={styles.title}>Cadastro</Text>


          {/* <View style={styles.selectContainer}>
            
            <Picker
              style={styles.pickerBox}
              selectedValue={tipoUsuario}
              onValueChange={(itemValue) => setTipoUsuario(itemValue)}
            >
              <Picker.Item label="Passageiro" value="passageiro" />
              <Picker.Item label="Motorista" value="motorista" />
            </Picker>
          </View> */}

          <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder=" Nome completo" />
          </View>

          {/* <View style={styles.form}>
            <Text style={styles.text}>Data de Nascimento</Text>
            <TextInput style={styles.textInput} placeholder="DD/MM/YYYY" />
          </View> */}

          {/* <View style={styles.form}>
            <Text style={styles.text}>Celular</Text>
            <TextInput style={styles.textInput} placeholder="Celular" />
          </View> */}

          <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Email"/>
          </View>

          <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Senha" secureTextEntry={true} />
          </View>

          <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Confirme sua senha " secureTextEntry={true} />
          </View>

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
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você é motorista?</Text>

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

          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>



        </View>
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
    backgroundColor: '#fff',
    marginBottom: 10,
  },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  box: {
    top:90,
    padding: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 15,
    marginBottom: 150,
    width:400,
    height:600,
  },

  box2: {
    top:10,
    padding: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 15,
    marginBottom: 200,
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
    margin: 10
  },

    button: {
    padding: 10,
    borderRadius: 10,
    width: 250,
    height:53,
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
    width:300,
    backgroundColor: '#f4f4f4',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },

  title: { // estilização do text
    fontSize: 28,
    color: '#F6B628',
    right:80,
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
  pickerBox: {
    borderColor: '#021C58',
    borderWidth: 1,
    borderRadius: 10,
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