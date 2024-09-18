import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Enviar() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={[styles.title, { marginBottom: 25, color: '#1A478A' }]}>Envie novo aviso</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título do aviso"
                />
                <TextInput
                    style={[styles.input, { height: 150 }]}
                    placeholder="Assunto"
                />

         <TouchableOpacity style={styles.botaoConf} >
                <Text style={styles.texto}>Salvar aviso</Text>
            </TouchableOpacity>

            </ScrollView>

        </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff'},

  input: {
    borderWidth: 1,
    borderColor: '#1A478A',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    height: 40,
    width: 350,
  },
 title: { // estilização do text
    fontSize: 25,
    color: '#FAB428',
    fontWeight: "bold",
    marginTop: 20,
  },
  botaoConf: {
    width: 290,
    height: 50,
    backgroundColor: '#1A478A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 5,
    marginBottom: 110,
    marginLeft:40,
},

texto: {
  color: '#F6B628',
  fontSize: 16,
  fontWeight: 'bold',
},









  }
  );