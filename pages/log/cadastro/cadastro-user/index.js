import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text'

export default function User (){
  const [tipoUsuario, setTipoUsuario] = useState('passageiro');
const [cell, setCell] = useState('');
const [cep, setCep] = useState('');

return(

<View style={styles.container}>


<View style={styles.box}>
<Text style={styles.title} >Cadastro Passageiro </Text>


          {/* <View style={styles.form}>
            <Text style={styles.text}>Endereço de embarque</Text>
            <TextInput style={styles.textInput} placeholder="Digite seu endereço"/>
          </View> */}

 <View style={styles.form}> 
          <TextInputMask
          style={styles.input}
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
            <TextInputMask
            style={styles.input}
            placeholder="CEP"
            type={'custom'}
            options={{
              mask: '99999-999',
            }}
            value={cep}
            onChangeText={text => setCep(text)}
          />

       </View>


           <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Bairro"/>
          </View>

           <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Cidade"/>
          </View>


  <View style={styles.form}>

      <View style={styles.selectContainer}>
            
            <Picker
              style={styles.picker}
              selectedValue={tipoUsuario}
              onValueChange={(itemValue) => setTipoUsuario(itemValue)}
            >
             <Picker.Item label="Acre" value="AC" />
        <Picker.Item label="Alagoas" value="AL" />
        <Picker.Item label="Amazonas" value="AM" />
        <Picker.Item label="Bahia" value="BA" />
        <Picker.Item label="Ceará" value="CE" />
        <Picker.Item label="Distrito Federal" value="DF" />
        <Picker.Item label="Espírito Santo" value="ES" />
        <Picker.Item label="Goiás" value="GO" />
        <Picker.Item label="Maranhão" value="MA" />
        <Picker.Item label="Mato Grosso" value="MT" />
        <Picker.Item label="Mato Grosso do Sul" value="MS" />
        <Picker.Item label="Minas Gerais" value="MG" />
        <Picker.Item label="Pará" value="PA" />
        <Picker.Item label="Paraíba" value="PB" />
        <Picker.Item label="Paraná" value="PR" />
        <Picker.Item label="Pernambuco" value="PE" />
        <Picker.Item label="Piauí" value="PI" />
        <Picker.Item label="Rio de Janeiro" value="RJ" />
        <Picker.Item label="Rio Grande do Norte" value="RN" />
        <Picker.Item label="Rio Grande do Sul" value="RS" />
        <Picker.Item label="Rondônia" value="RO" />
        <Picker.Item label="Roraima" value="RR" />
        <Picker.Item label="Santa Catarina" value="SC" />
        <Picker.Item label="São Paulo" value="SP" />
        <Picker.Item label="Sergipe" value="SE" />
        <Picker.Item label="Tocantins" value="TO" />
      </Picker>
      
          </View> 
</View>

</View>




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
  
  },
  title: { // estilização do text
    fontSize: 25,
    color: '#F6B628',
    padding: 10,
    textAlign: 'center',
    fontVariant: 'bold',
    fontWeight: 'bold',
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
    margin:5,
    borderColor: '#CCCCCC',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
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
  
};