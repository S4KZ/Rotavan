import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker'; // Importa o Picker
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa os ícones

export default function CadastrarEquipe() {
  const [selectedSchool, setSelectedSchool] = useState(''); // Estado para o endereço e turno

  async function handleCadastrarEquipe() {
    // Função para processar o cadastro
    if (selectedSchool === '') {
      alert('Por favor, selecione o endereço e turno da equipe.');
      return;
    }

    alert(`Equipe cadastrada com sucesso! Endereço e turno: ${selectedSchool}`);
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Cadastrar Equipe</Text>

        {/* Card de seleção de endereço e turno */}
        <View style={styles.card}>
          <Icon name="building" size={30} color="#F6B628" style={styles.icon} />
          <Text style={styles.cardTitle}>Endereço e Turno</Text>
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

        {/* Botão de salvar */}
        <TouchableOpacity style={styles.botaoConf} onPress={handleCadastrarEquipe}>
          <Text style={styles.texto}>Cadastrar Equipe</Text>
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
    color: '#1A478A',
    fontWeight: 'bold',
    marginBottom: 20,
    top: 50,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    top: 50,
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#F6B628',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#1A478A',
    borderRadius: 8,
  },
  botaoConf: {
    width: 290,
    height: 50,
    backgroundColor: '#1A478A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginBottom:300,
  },
  texto: {
    color: '#F6B628',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
