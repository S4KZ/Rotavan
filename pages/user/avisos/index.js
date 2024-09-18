import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Avisos() {
  return (

    <ScrollView> 
       {/* <SafeAreaView style={styles.container} > */}
    
    <View  style={styles.container}> 
     
      
      <Text style={styles.title}>Pendentes</Text>
           <View style={styles.row}> 
              <View style={styles.column}>
              <Text style={styles.subtitle}>Não haverá van amanhã</Text>
              <Text style={styles.paragraph}>A 
                van apresentou um problema de motor, já foi levada para
                 o concerto porém só ficará pronta amanhã no período da tarde!</Text>
                 <Text style={styles.paragraphh}>Motorista Rodrigo</Text>
                 <Text style={styles.paragraphh}>08/05/2024 - 19:11h </Text>
              </View>
      
          
        </View>



     
      <Text style={styles.title}>Já vizualizados</Text>
           <View style={styles.row2}> 
              <View style={styles.column}>
              <Text style={styles.subtitle}>Atenção com os horários! </Text>
              <Text style={styles.paragraph}>Nos últimos dias tem ocorrido muitos atrasos na hora da ida então peço por favor para que 
                se atentem aos horários pois isso prejudica e atrasa sua chegada. </Text>
                 <Text style={styles.paragraphh}>Motorista Rodrigo</Text>
                 <Text style={styles.paragraphh}>08/05/2024 - 19:11h </Text>
        
            </View>
          </View>



    </View>
    {/* </SafeAreaView> */}
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

  title:{ // estilização do text
    fontSize: 25,
    color: '#FAB428',
    fontWeight: "bold",
    marginTop:20,
  },

  subtitle:{ // estilização do subtext
   
    fontSize: 18,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'center',

  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: "bold",
  },

  paragraphh: {

    fontSize: 12,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'right',

  },
  
   
  
    row: { // a classe row é pra deixar aquele os items(Text e Image), alinhado um do lado do outro
      //assim n precisando fazer um milhão de margin pra alinhar certo
      display: "flex",
      flexDirection: "column",

      marginBottom:80,
      //estilização
      padding: 20,
      borderRadius: 15,
      top: 20, 
      minHeight:200,
      maxheight: 300,
      minwidth: 100,
      maxWidth:350,
 
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
  flexDirection: "column",

  marginBottom:200,
  //estilização
  padding: 20,
  borderRadius: 15,
  top: 20, 
  minHeight:200,
  maxheight: 300,
  minwidth: 100,
  maxWidth:350,

//colocar sombras
  backgroundColor: '#FFFFFF', 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 15 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  shadowSpread: 5,
  elevation: 15,
}

});