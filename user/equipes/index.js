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


        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.title}>Você pertence a essa van</Text>
            <Text style={styles.subtitle}>Motorista: Rodrigo</Text>
            <Text style={styles.subtitle}>Número:200</Text>
          </View>

          <View style={styles.row2}>
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


  ilustra: {
    flex: 1,
    width: 290,
    height: 290,
    resizeMode: 'contain',
    top: 10,
    marginBottom: 10,
  },

  box: {
    backgroundColor: "#FAFAFA",
    padding: 20,
    width: "93%",
    height: 590,
    top: 40,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 200,
  },

  row: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderRadius: 15,
    top: 20,
    width: "98%",
    height: 190,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },

  row2: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderRadius: 15,
    top: 40,
    width: "98%",
    height: 300,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },


  title: {
    fontSize: 20,
    color: '#F6B628',
    fontWeight: "bold",
    padding: 20,
    textAlign: 'center'

  },

  subtitle: {
    fontSize: 15,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'left',
  },

  subtitle2: {
    fontSize: 15,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'center',

  }

});