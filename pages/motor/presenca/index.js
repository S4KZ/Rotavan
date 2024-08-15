import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ilusEqui = require("../../../assets/icons/ilustra-presenConf.png")// o icone

export default function Equipes() {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image source={ilusEqui} style={styles.ilustra} />

        <View style={styles.box}>
          <Text style={styles.title}>Veja quem vai hoje na ida</Text>
          <View style={styles.row}>
            <View style={styles.container}>
                <Text style={styles.label}> Usuário                    Horário</Text>
                <TouchableOpacity >
                  <Text style={styles.info}>Isabelle Vidal                    6:35</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                  <Text style={styles.info}>Maria Júlia                        6:40</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                  <Text style={styles.info}>Isabelle Vidal                    6:45</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                  <Text style={styles.info}>Maria Júlia                        6:50</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                  <Text style={styles.info}>Isabelle Vidal                    6:55</Text>
                </TouchableOpacity>
                
                <TouchableOpacity >
                  <Text style={styles.info}>Maria Júlia                        7:10</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        <View style={styles.box}>
          <Text style={styles.title}>Veja quem vai voltar hoje</Text>
          <View style={styles.row}>
            <View style={styles.container}>
                <Text style={styles.label}> Usuário                    Horário</Text>
                <TouchableOpacity >
                  <Text style={styles.info}>Isabelle Vidal                    6:35</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                  <Text style={styles.info}>Maria Júlia                        6:40</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                  <Text style={styles.info}>Isabelle Vidal                    6:45</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                  <Text style={styles.info}>Maria Júlia                        6:50</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                  <Text style={styles.info}>Isabelle Vidal                    6:55</Text>
                </TouchableOpacity>
                
                <TouchableOpacity >
                  <Text style={styles.info}>Maria Júlia                        7:10</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>



        <TouchableOpacity style={styles.botaoConf} >
          <Text style={styles.texto}>Iniciar rota</Text>
        </TouchableOpacity>







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
    marginBottom: 10,

  },

  box: {
    //estilização
    backgroundColor: "#FAFAFA",
    padding: 20,
    width: "90%",
    height: 490,
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
    marginBottom: 40,
  },


  row: { // a classe row é pra deixar aquele os items(Text e Image), alinhado um do lado do outro
    //assim n precisando fazer um milhão de margin pra alinhar certo
    display: "flex",
    flexDirection: "row",
    //estilização
    padding: 20,
    borderRadius: 15,
    top: 10,
    width: "100%",
    //colocar sombras
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 5,
  },


  title: { // estilização do text
    fontSize: 22,
    color: '#F6B628',
    fontWeight: "bold",
    padding: 23,
    textAlign: 'center',

  },

  subtitle: { // estilização do subtext

    fontSize: 15,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'left',

  },

  subtitle2: { // estilização do subtext

    fontSize: 15,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'center',

  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    paddingHorizontal: 10,

  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    gap: 10,
    color: '#1A478A',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    alignItems: 'left',
    gap: 20,
  },
  botaoConf: {
    width: 300, // largura do botão quadrado
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
    marginTop: 2,
    marginBottom: 150,
  },
  texto: {
    color: '#F6B628', // cor do texto
    fontSize: 20, // tamanho do texto
    fontWeight: 'bold', // negrito do texto
  }


});
