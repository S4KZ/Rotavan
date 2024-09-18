import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import config from '../../../../config/config.json';

export default function Adicionar() {
  const route = useRoute();
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail

  async function handleAdicionar() {
    const { userId } = route.params || {}; // Garante que userId é acessado de forma segura
    console.log(userId);

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
        }),
      });
      let ress = await reqs.json();
      console.log(ress);
      if(ress.msg === 'carregou'){
        alert('Adicionado com sucesso!');
      }else{
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

        <TextInput
          style={styles.input}
          placeholder=" Email do integrante:"
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
    height: 40,
    width: 350,
    top: 200,
    marginBottom: 60,
  },
  botaoConf: {
    width: 290, // largura do botão quadrado
    height: 50, // altura do botão quadrado
    backgroundColor: '#1A478A', // cor de fundo do botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 25, // bordas arredondadas
    // colocar sombras
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
    color: '#F6B628', // cor do texto
    fontSize: 20, // tamanho do texto
    fontWeight: 'bold', // negrito do texto
  },
});
