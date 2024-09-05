import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function User (){
  const [tipoUsuario, setTipoUsuario] = useState('passageiro');
return(

<View style={styles.container}>


<View style={styles.box}>
<Text style={styles.title} >Cadastro Passageiro </Text>


          <View style={styles.form}>
            <Text style={styles.text}>Endereço de embarque</Text>
            <TextInput style={styles.textInput} placeholder="Digite seu endereço"/>
          </View>

            <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Digite seu cep"/>
          </View>

           <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Digite seu Bairro"/>
          </View>

           <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Digite sua Cidade"/>
          </View>


      <View style={styles.selectContainer}>
            
            <Picker
              style={styles.pickerBox}
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
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },

  title: { // estilização do text
    fontSize: 28,
    color: '#F6B628',
    right:40,
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
   form: {
    padding: 10
  },
  textInput: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },

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