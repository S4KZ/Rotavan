import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import config from '../../../../config/config.json';
import { Picker } from '@react-native-picker/picker'; // Importa o Picker

export default function Adicionar() {
  const route = useRoute();
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail
  const [selectedSchool, setSelectedSchool] = useState(''); // Estado para a escola e turno

  async function handleAdicionar() {
    const { userId } = route.params || {}; // Garante que userId é acessado de forma segura

    try {
      let reqs = await fetch(config.urlRootNode + '/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          motId: userId, // id do motorista
          email: email, // Adiciona o e-mail ao corpo da requisição
          schoolTurno: selectedSchool, // Adiciona a escola e o turno selecionado
        }),
      });
      let ress = await reqs.json();
      if (ress.msg === 'carregou') {
        alert('Adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar!');
      }
    } catch (error) {
      console.error('Erro ao adicionar integrante:', error);
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, { color: '#1A478A' }]}>Adicionar um novo integrante</Text>

        {/* Envolve o Picker dentro de uma View com borda */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSchool}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSchool(itemValue)}
          >
            <Picker.Item label="Selecione o endereço e turno" value="" />
            <Picker.Item label="Escola 1 - Turno Manhã" value="escola1-manhã" />
            <Picker.Item label="Escola 1 - Turno Tarde" value="escola1-tarde" />
            <Picker.Item label="Escola 1 - Turno Noite" value="escola1-noite" />
            <Picker.Item label="Escola 2 - Turno Manhã" value="escola2-manhã" />
            <Picker.Item label="Escola 2 - Turno Tarde" value="escola2-tarde" />
            <Picker.Item label="Escola 2 - Turno Noite" value="escola2-noite" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email do integrante:"
          value={email} // Valor do TextInput
          onChangeText={setEmail} // Atualiza o estado com o valor inserido
        />

        <TouchableOpacity style={styles.botaoConf} onPress={handleAdicionar}>
          <Text style={styles.texto}>Salvar</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    top: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1A478A',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  
    width: 350,
    top: 200,
    marginBottom: 60,
  },
  // Estilo da View ao redor do Picker para adicionar borda
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#1A478A',
    borderRadius: 8,
    marginBottom: 20,
    width: 350,
    top: 200,
  },
  picker: {
    height: 50,
    width: '100%',
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
    marginTop: 2,
    marginBottom: 500,
    top: 170,
  },
  texto: {
    color: '#F6B628',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
