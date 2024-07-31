import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';


const Screen1 = () => (
  <View style={styles.container}>

  
    <ScrollView> 
       {/* <SafeAreaView style={styles.container} > */}
    
    <View  style={styles.container}> 
    {/* <View style={styles.box}> 
      <Text style={styles.title}>Enviar novo aviso</Text>
           <View style={styles.row2}> 
              <View style={styles.column}>


              <TouchableOpacity style={styles.item}>
      <Icon name="file-text-o" size={35} color="#1A478A" style={styles.icon} />
      <Text style={styles.subtitle}>Digite aqui</Text>
      </TouchableOpacity>
             

              </View>
            </View>
          
        </View> */}

    


        <View style={styles.box2}> 
        
      <Text style={styles.title}>Já enviados </Text>
           <View style={styles.row}> 
              <View style={styles.column}>

              <TouchableOpacity style={styles.item}>
      <Icon name="exclamation-circle" size={35} color="#1A478A" style={styles.icon} />
      <Text style={styles.subtitle}>Atenção com os horários! </Text>
      </TouchableOpacity>



             
              <Text style={styles.paragraph}>Nos últimos dias tem ocorrido muitos atrasos na hora da ida então peço por favor para que 
                se atentem aos horários pois isso prejudica e atrasa sua chegada. </Text>
                 <Text style={styles.paragraphh}>Motorista Rodrigo</Text>
                 <Text style={styles.paragraphh}>08/05/2024 - 19:11h </Text>

              </View>
            </View>

                <View style={styles.row}> 
              <View style={styles.column}>

              <TouchableOpacity style={styles.item}>
      <Icon name="times" size={35} color="#1A478A" style={styles.icon} />
      <Text style={styles.subtitle}>Não haverá van amanhã</Text>
      </TouchableOpacity>
             

              <Text style={styles.paragraph}>A 
                van apresentou um problema de motor, já foi levada para
                 o concerto porém só ficará pronta amanhã no período da tarde!</Text>
                 <Text style={styles.paragraphh}>Motorista Rodrigo</Text>
                 <Text style={styles.paragraphh}>08/05/2024 - 19:11h </Text>
              </View>
            </View>
          

          </View>








    </View>
    {/* </SafeAreaView> */}
     </ScrollView> 









  </View>
);

const Screen2 = () => (






  <View style={styles.container}>
  

  <ScrollView> 

    <Text style={[styles.title , { marginBottom: 25,    color: '#1A478A'}]}>Envie novo aviso</Text>


    <TextInput
        style={styles.input}
        placeholder="Título do aviso"
      />

      <TextInput
        style={[styles.input, { height: 150 }]}
        placeholder="Assunto"
      />











    </ScrollView> 

  </View>
);

const ScreenSwitcher = () => {
  const [currentScreen, setCurrentScreen] = useState('screen1');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'screen1':
        return <Screen1 />;
      case 'screen2':
        return <Screen2 />;
      default:
        return <Screen1 />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <TouchableOpacity style={styles.botaoConf}
        onPress={() => setCurrentScreen(currentScreen === 'screen1' ? 'screen2' : 'screen1')}
      >

        <Text style={styles.texto}>
          {currentScreen === 'screen1' ? 'Enviar um novo aviso' : 'Salvar aviso'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff'
  },
  titlee: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1A478A',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    height:40,
    width:350,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
    marginBottom:120,
  },

  title:{ // estilização do text
    fontSize: 25,
    color: '#FAB428',
    fontWeight: "bold",
    marginTop:20,
  },

  item: {
    flexDirection: 'row',
    alignItems:'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  icon: {
    marginRight: 15,
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
  
    box: {
      //estilização
      backgroundColor: "#FAFAFA",
      padding: 20,
      width: "93%",
      height: 250,
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
      height: 600,
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
      flexDirection: "row",

      //estilização
      padding: 20,
      borderRadius: 15,
      top: 20, 
      width: "105%",
      height: 220,//margin top
      
      //colocar sombras
  backgroundColor: '#FFFFFF', 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 15 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  shadowSpread: 5,
  elevation: 25,
  marginBottom:20,
    },
    row2: { // a classe row é pra deixar aquele os items(Text e Image), alinhado um do lado do outro
      //assim n precisando fazer um milhão de margin pra alinhar certo
      display: "flex",
      flexDirection: "row",

      //estilização
      padding: 20,
      borderRadius: 15,
      top: 20, 
      width: "98%",
      height: 120,//margin top
      
      //colocar sombras
  backgroundColor: '#FFFFFF', 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 15 },
  shadowOpacity: 0.2,

  
  shadowRadius: 5,
  shadowSpread: 5,
  elevation: 25,
    },
    texto: {
      color:'#F6B628', // cor do texto
      fontSize: 18, // tamanho do texto
      fontWeight: 'bold', // negrito do texto
    }
    

});

export default ScreenSwitcher;
