import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Adicionar(){
    return(

        <ScrollView> 
    <View  style={styles.container}> 
     

 <Text style={[styles.title , {   color: '#1A478A'}]}>Adicionar um novo integrante</Text>


<TextInput
    style={styles.input}
    placeholder="Id ou email do integrante:"
  />



        <TouchableOpacity style={styles.botaoConf} >
          <Text style={styles.texto}>Salvar </Text>
          </TouchableOpacity>
       
  


    </View>
    </ScrollView>

);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffff',
     
    },
    title: {
      fontSize: 23,
      fontWeight: 'bold',
      marginBottom: 20,
      top:40,
    },
    input: {
      borderWidth: 1,
      borderColor: '#1A478A',
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      height:40,
      width:350,
      top:40,
      marginBottom: 60,
    },
    botaoConf: {
        width: 250, // largura do botão quadrado
        height: 50, // altura do botão quadrado
        backgroundColor: '#1A478A', // cor de fundo do botão
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 25, // bordas arredondadas
        //colocar sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        marginTop:2,
        marginBottom:500,
      } ,
      texto: {
        color:'#F6B628', // cor do texto
        fontSize: 20, // tamanho do texto
        fontWeight: 'bold', // negrito do texto
      },
      
  box2: {
      //estilização
      backgroundColor: "#FAFAFA",
      padding: 20,
      width: "90%",
      height: 500,
      top: 10, //margin top
      borderRadius: 15,
      //posicionamento dos componentes 
      alignItems: "center",
      //colocar sombras
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginBottom:50,
    },



  row: { // a classe row é pra deixar aquele os items(Text e Image), alinhado um do lado do outro
    //assim n precisando fazer um milhão de margin pra alinhar certo
    display: "flex",
    flexDirection: "row",

    //estilização
    padding: 18,
    borderRadius: 15,
    top: 10, 
    width: "90%",
    height: 210,

    backgroundColor: '#FFFFFF', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 25,
    marginBottom:40,
      },

      row2: { // a classe row é pra deixar aquele os items(Text e Image), alinhado um do lado do outro
        //assim n precisando fazer um milhão de margin pra alinhar certo
        display: "flex",
        flexDirection: "row",
    
        //estilização
        padding: 20,
        borderRadius: 15,
        top: 5, 
        width: "100%",
        height: 315,//margin top

        
            //colocar sombras
        backgroundColor: '#FFFFFF', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowSpread: 5,
        elevation: 25,
          },

    
});