import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text'
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/FontAwesome';
import Login from '../../login';
import {  useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


  const User = () => {
    const navigation = useNavigation();
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState({
      logradouro: '',
      bairro: '',
      cidade: '',
      uf: ''
    });

    useEffect(() => {
      // Verifica se o CEP tem 8 caracteres antes de fazer a requisição
      if (cep.length === 8) {
        (async () => {
          // console.log(cep);
          try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (data.erro) {
              // Se o CEP for inválido, você pode querer limpar os campos ou exibir uma mensagem
              setEndereco({
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: ''
              });
              return;
            }
  
            setEndereco({
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              uf: data.uf
            });
          } catch (error) {
            // Lide com erros de rede ou outros problemas
            console.error('Erro ao buscar endereço:', error);
          }
        })();
      }
    }, [cep]);
  

  const [tipoUsuario, setTipoUsuario] = useState('passageiro');
  const [cell, setCell] = useState('');





return(

<View style={styles.container}>

<Text style={styles.title} >Cadastro Passageiro </Text>

<Animatable.View 
 animation={"fadeInUp"}
 delay={500}

style={styles.box}>


 <View style={styles.form}> 
          <TextInputMask style={styles.input}
          placeholder="Telefone"
          type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            value={cell}
            onChangeText={text =>  setCell (text)}
          />
 </View>

     <View style={styles.form}>
     <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={(text) => {
          // Remove caracteres não numéricos
          const cleanText = text.replace(/\D/g, '');
          setCep(cleanText);
        }}
        keyboardType="numeric"
        maxLength={8}
      />
       </View>

      <View style={styles.form}>
        <Text style={styles.input2}  >Rua: {endereco.rua}</Text>
        </View>
        <View style={styles.form}>
        <Text  style={styles.input2}>Bairro: {endereco.bairro}</Text>
        </View>
        <View style={styles.form}>
        <Text style={styles.input2}>Cidade: {endereco.cidade}</Text>
        </View>
        <View style={styles.form}>
        <Text style={styles.input2}>UF: {endereco.uf}</Text>
      </View>

      <View style={styles.form}>
          <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('RouterUser') }>
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
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
  },
  icon: {
    position:'absolute',
    left:22,
    top:25,
},

  box: {
    top:100,
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
    padding: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 10,
  
  },
  title: { // estilização do text
    fontSize: 25,
    color: '#F6B628',
    padding: 10,
    textAlign: 'center',
    fontVariant: 'bold',
    fontWeight: 'bold',
    top:55,
},
  selectContainer: {
    padding: 10,
    borderRadius: 20,
    height: 50,
     width:300,

  },
   form: {
    padding: 10
  },
  input: {
    height: 50,
    width:300,
    margin:1,
    borderColor: '#CCCCCC',
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f4f4f4',
  
  },

  input2: {
    height: 50,
    width:300,
    margin:1,
    borderColor: '#CCCCCC',
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: '#696969',
    backgroundColor: '#f4f4f4',
  
  },

   picker: {
    borderColor: '#021C58',
    borderRadius:20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    color: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
     backgroundColor: '#f4f4f4',
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#1A478A',
    width: 295,
    height:45,
    top:20,

  },
  buttonText: {
    color: '#F6B628',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default  User;