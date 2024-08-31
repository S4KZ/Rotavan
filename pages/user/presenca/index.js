import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const ilusConfi = require("../../../assets/icons/ilustra-Confirmar.png")// o icone



export default function Presenca() {
  return (
   
      <ScrollView>
        <SafeAreaView style={styles.container}  >

        <Image source={ilusConfi} style={styles.ilustra} /> 
        <View style={styles.box3}>
          <Text style={styles.title}>Confirme sua presença </Text>

          <View style={styles.botoesContainer}>

          <TouchableOpacity style={styles.botao} >
          <Text style={styles.texto}>Não irei hoje</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.botao} >
          <Text style={styles.texto}>Irei hoje</Text>
          </TouchableOpacity>

          </View>

        
          <TouchableOpacity style={styles.botaoConf} >
          <Text style={styles.texto}>CONFIRMAR</Text>
          </TouchableOpacity>
     
      
  
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,
  
  },

  ilustra: { //estilização da imagem

    flex: 1,
    width: 350, // largura desejada da imagem
    height: 350, // altura desejada da imagem
    resizeMode: 'contain', // ajuste de escala da imagem
  },
  box3: {
    flexDirection:'column',
    padding: 40,
    maxHeight:1000,
    minHeight:600,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width:0, height:10 },
    shadowRadius: 1.3,
    elevation: 25,
    marginBottom:30,
    top:20,
    
  },

  title:{ // estilização do text
    fontSize: 20,
    color: '#F6B628',
    fontWeight: "bold",
    padding: 20, 
    textAlign: 'center'
  },

  botoesContainer: {
    flexDirection: 'row', // alinha os botões em linha
    justifyContent: 'center', // alinha os botões no centro
    alignItems: 'center', // alinha os botões verticalmente no centro
  },


  botao: {
    width: 150, // largura do botão quadrado
    height: 100, // altura do botão quadrado
    backgroundColor:'#F4F4F4', // cor de fundo do botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, 
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10, // bordas arredondadas

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop:10,
    marginBottom:20,
  },

  
  botaoConf: {
    width: 300, // largura do botão quadrado
    height: 50, // altura do botão quadrado
    backgroundColor: '#F6B628', // cor de fundo do botão
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
    marginBottom:100,
  },

  texto: {
    color:'#1A478A', // cor do texto
    fontSize: 18, // tamanho do texto
    fontWeight: 'bold', // negrito do texto
  },



});