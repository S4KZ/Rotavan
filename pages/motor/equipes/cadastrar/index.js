import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CadastrarEquipe() {
  const [selectedSchool, setSelectedSchool] = useState(''); 
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: ''
  });

  async function buscarEndereco(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        alert('CEP não encontrado');
      } else {
        setEndereco({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf
        });
      }
    } catch (error) {
      alert('Erro ao buscar o endereço. Tente novamente.');
    }
  }

  async function handleCadastrarEquipe() {
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
             {/* <Icon name="users" size={30} color="#F6B628" style={styles.icon} />
    */}

        <View style={styles.card}>
          <Picker
            selectedValue={selectedSchool}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSchool(itemValue)}
          >
            <Picker.Item label="Selecione o turno" value="" />
            <Picker.Item label="Turno Manhã" value="Turno-manhã" />
            <Picker.Item label="Turno Tarde" value="Turno-tarde" />
            <Picker.Item label="Turno Noite" value="Turno-noite" />
          </Picker>
        </View>

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Nome da equipe" />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite o CEP"
            value={cep}
            onChangeText={(text) => {
              const cleanText = text.replace(/\D/g, '');
              setCep(cleanText);
            }}
            keyboardType="numeric"
            maxLength={8}
            onBlur={() => {
              if (cep.length === 8) {
                buscarEndereco(cep);
              }
            }}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.input2}>Endereço: {endereco.logradouro}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.input2}>Bairro: {endereco.bairro}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.input2}>Cidade: {endereco.cidade}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.input2}>UF: {endereco.uf}</Text>
        </View>

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
  form: {
    padding: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    top: 50,
    marginBottom: 60,
  },
  icon: {
    marginBottom: 10,
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
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 150,
  },
  texto: {
    color: '#F6B628',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: 300,
    margin: 1,
    borderColor: '#CCCCCC',
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f4f4f4',
  },
  input2: {
    height: 50,
    width: 300,
    margin: 1,
    borderColor:'#CCCCCC',
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: '#696969',
    backgroundColor: '#f4f4f4',
  },
});
