
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';


import Enviar from './enviar';


function Tela() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <ScrollView>

        <View style={styles.container}>
       
            <Text style={styles.title}>Avisos</Text>
            <View style={styles.row2}>

              <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Enviar')}>
                <Icon name="file-text-o" size={35} color="#1A478A" style={styles.icon} />
                <Text style={styles.subtitle}>Digite aqui</Text>
              </TouchableOpacity>

            </View>
       

         
            <Text style={styles.title}>Já enviados </Text>
            <View style={styles.row2}>
          
                <TouchableOpacity style={styles.item}>
                  <Icon name="exclamation-circle" size={28} color="#1A478A" style={styles.icon} />
                  <Text style={styles.subtitle}>Atenção com os horários! </Text>
                </TouchableOpacity>

                <Text style={styles.paragraph}>Nos últimos dias tem ocorrido muitos atrasos na hora da ida então peço por favor para que
                  se atentem aos horários pois isso prejudica e atrasa sua chegada. </Text>
                <Text style={styles.paragraphh}>Motorista Rodrigo</Text>
                <Text style={styles.paragraphh}>08/05/2024 - 19:11h </Text>

            </View>

            <View style={styles.row}>
            
                <TouchableOpacity style={styles.item}>
                  <Icon name="times" size={28} color="#1A478A" style={styles.icon} />
                  <Text style={styles.subtitle}>Não haverá van amanhã</Text>
                </TouchableOpacity>

                <Text style={styles.paragraph}>A
                  van apresentou um problema de motor, já foi levada para
                  o concerto porém só ficará pronta amanhã no período da tarde!</Text>
                <Text style={styles.paragraphh}>Motorista Rodrigo</Text>
                <Text style={styles.paragraphh}>08/05/2024 - 19:11h </Text>
            </View>
            





        </View>

      </ScrollView>


    </View>
  )
};

export default function EnviarNav() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>


      <Stack.Screen
        name='Tela'
        component={Tela}
      options={{ headerShown: false }}
      />

      <Stack.Screen
        name='Enviar'
        component={Enviar}
         options={{ headerShown: false }}
      />


    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff'
  },

  title: { // estilização do text
    fontSize: 25,
    color: '#FAB428',
    fontWeight: "bold",
    marginTop: 20,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  icon: {
    marginRight: 15,
  },

  subtitle: { // estilização do subtext
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
    marginVertical: 5,
    fontWeight: "bold",
  },

  paragraphh: {
    fontSize: 12,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'right',

  },

  row: {
    display: "flex",
    flexDirection: "column",

    //estilização
    padding: 20,
    borderRadius: 10,
    top: 20,
    width: "95%",
    minheight: 120,
    maxHeight:250,

    //colocar sombras
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 10,
    marginBottom:150,
},
  row2: { 
    display: "flex",
    flexDirection: "column",

    //estilização
    padding: 20,
    borderRadius: 10,
    top: 20,
    width: "95%",
    minheight: 120,
    maxHeight:250,

    //colocar sombras
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 10,
    marginBottom:30,
  },
 

});

