import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ilusEqui = require("../../../assets/icons/ilustra-equipe.png")// o icone 


export default function Equipe() {
  return (


    <ScrollView>
    <SafeAreaView style={styles.container}>
      
     
      <Image source={ilusEqui} style={styles.ilustra} />


      <View style={styles.box3}> 
    
           <View style={styles.row}> 
              <View style={styles.column}>
              <Text style={styles.title}>Você pertence a essa van</Text>
              <Text style={styles.subtitle}>Motorista: Rodrigo</Text>
              <Text style={styles.subtitle}>Número:200</Text>
              </View>
            </View>

            <View style={styles.row2}> 
              <View style={styles.column}>
              <Text style={styles.title}>Você pertence a essa van</Text>
              <Text style={styles.subtitle2}>Aluno: Isabelle Vidal   123344899</Text>
              <Text style={styles.subtitle2}>Aluno: Isabelle Vidal   123344899</Text>
              <Text style={styles.subtitle2}>Aluno: Isabelle Vidal   123344899</Text>
              <Text style={styles.subtitle2}>Aluno: Isabelle Vidal   123344899</Text>
              <Text style={styles.subtitle2}>Aluno: Isabelle Vidal   123344899</Text>
              <Text style={styles.subtitle2}>Aluno: Isabelle Vidal   123344899</Text>
              <Text style={styles.subtitle2}>Aluno: Isabelle Vidal   123344899</Text>
              <Text style={styles.subtitle2}>Aluno: Isabelle Vidal   123344899</Text>

        

              </View>
            </View>
            
        </View>


      

    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  
  ilustra: { //estilização da imagem
    flex: 1,
    width: 290, // largura desejada da imagem
    height: 290, // altura desejada da imagem
    resizeMode: 'contain', // ajuste de escala da imagem
    // position: 'absolute'  ,     // posicionamento absoluto
    top: 10, // ajusta a posição verticalmente
    marginBottom:10,

  },
  box3: {
    flexDirection:'column',
    padding: 40,
    maxHeight:1000,
    minHeight:650,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width:0, height:10 },
    shadowRadius: 1.3,
    elevation: 20,
    marginBottom:30,
    
  },

  row: { // a classe row é pra deixar aquele os items(Text e Image), alinhado um do lado do outro
    //assim n precisando fazer um milhão de margin pra alinhar certo
    display: "flex",
    flexDirection: "column",

    //estilização
    padding: 20,
    borderRadius: 15,
    top: 20, 
    width: "98%",
    height: 150,//margin top
    
        //colocar sombras
    backgroundColor: '#FFFFFF', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 15,
      },

      row2: { // a classe row é pra deixar aquele os items(Text e Image), alinhado um do lado do outro
        //assim n precisando fazer um milhão de margin pra alinhar certo
        display: "flex",
        flexDirection: "row",
    
        //estilização
        padding: 20,
        borderRadius: 15,
        top: 40, 
        width: "98%",
        height: 300,//margin top

        
            //colocar sombras
        backgroundColor: '#FFFFFF', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowSpread: 5,
        elevation: 15,
          },
    

  title:{ // estilização do text
    fontSize: 20,
    color: '#F6B628',
    fontWeight: "bold",
    padding: 20, 
    textAlign: 'center'
   
  },

  subtitle:{ // estilização do subtext
   
    fontSize: 15,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'left',

  },

  subtitle2:{ // estilização do subtext
   
    fontSize: 15,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'center',

  }

});