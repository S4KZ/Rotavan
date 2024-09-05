import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';



export default function User (){

      const [tipoUsuario, setTipoUsuario] = useState('passageiro');
return(

<View style={styles.container}>


<View style={styles.box}>

<Text style={styles.title} >Cadastro Motorista </Text>


          <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Digite seu telefone"/>
          </View>

            <View style={styles.form}>
       
            <TextInput style={styles.textInput} placeholder="Digite seu CNH"/>
          </View>

           <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Digite seu CPF"/>
          </View>
            
     <Text style={styles.title} >Cadastro da van</Text>


          <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder="Digite seu telefone"/>
          </View>

            <View style={styles.form}>
       
            <TextInput style={styles.textInput} placeholder="Digite seu CNH"/>
          </View>



       <View style={styles.form}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
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