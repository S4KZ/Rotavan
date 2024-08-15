import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Avisos() {
  return (

    <ScrollView> 
     
    
    <View  style={styles.container}> 
     
      <View style={styles.box}> 
      <Text style={styles.title}>Pendentes</Text>
           <View style={styles.row}> 
              <Text style={styles.subtitle}>Não haverá van amanhã</Text>
              <Text style={styles.paragraph}>A 
                van apresentou um problema de motor, já foi levada para
                 o concerto porém só ficará pronta amanhã no período da tarde!</Text>
                 <Text style={styles.paragraphh}>Motorista Rodrigo</Text>
                 <Text style={styles.paragraphh}>08/05/2024 - 19:11h </Text>
              </View>
        </View>

        <View style={styles.box2}> 
      <Text style={styles.title}>Já vizualizados</Text>
           <View style={styles.row}> 
           
              <Text style={styles.subtitle}>Atenção com os horários! </Text>
              <Text style={styles.paragraph}>Nos últimos dias tem ocorrido muitos atrasos na hora da ida então peço por favor para que 
                se atentem aos horários pois isso prejudica e atrasa sua chegada. </Text>
                 <Text style={styles.paragraphh}>Motorista Rodrigo</Text>
                 <Text style={styles.paragraphh}>08/05/2024 - 19:11h </Text>
              </View>
          
          </View>


    </View>
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

  title:{ 
    fontSize: 25,
    color: '#FAB428',
    fontWeight: "bold",
    marginTop:20,
  },

  subtitle:{ 
    fontSize: 18,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'center',

  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    textAlign: 'justify',
    marginVertical: 15,
    fontWeight: "bold",
  },

  paragraphh: {
    fontSize: 12,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'right',

  },

    box: {

      flexDirection: "column",
      backgroundColor: "#FAFAFA",
      padding: 20,
      width: "93%",
      height: 390,
      top: 40, //margin top
      borderRadius: 15,
      //posicionamento dos componentes 
      alignItems: "center",
      //colocar sombras
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    
    box2: {
      //estilização
      backgroundColor: "#FAFAFA",
      padding: 20,
      width: "93%",
      height: 390,
      top: 70, //margin top
      borderRadius: 15,
      //posicionamento dos componentes 
      alignItems: "center",
      //colocar sombras
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginBottom:200,
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
      height: 240,//margin top
      
      //colocar sombras
  backgroundColor: '#FFFFFF', 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 15 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  shadowSpread: 5,
  elevation: 10,
    }












});