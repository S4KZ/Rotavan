import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../../../../config/config.json';

export default function Enviar() {
  const route = useRoute();
  const { userId } = route.params || {};
  console.log(userId);

  const [avTitulo, setAvTitulo] = useState(''); // Armazena o valor do título
  const [avAss, setAvAss] = useState(''); // Armazena o valor do assunto

  const handleEnviar = async () => {
    try {
      const response = await fetch(config.urlRootNode + '/addAvisos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avTitulo,
          avAss,
          motId: userId,
        }),
      });

      const data = await response.json();
      if (data.mensagem === 'Aviso criado com sucesso!') {
        console.log('Aviso criado com sucesso!');
        Alert.alert('AVISO ENVIADO COM SUCESSO');

        // Limpar os campos de texto após o aviso ser enviado com sucesso
        setAvTitulo('');
        setAvAss('');
      } else {
        console.error('Erro ao criar aviso:', data);
      }
    } catch (error) {
      console.error('Erro ao criar aviso:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.title, { marginBottom: 25, color: '#1A478A' }]}>Envie novo aviso</Text>
        <TextInput
          style={styles.input}
          placeholder="Título do aviso"
          value={avTitulo}
          onChangeText={(texto) => setAvTitulo(texto)}
        />
        <TextInput
          style={[styles.input, { height: 150 }]}
          placeholder="Assunto"
          value={avAss}
          onChangeText={(texto) => setAvAss(texto)}
        />

        <TouchableOpacity style={styles.botaoConf} onPress={handleEnviar}>
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
    backgroundColor: '#ffff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#1A478A',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    height: 40,
    width: 350,
  },
  title: {
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
    marginLeft: 40,
  },
  texto: {
    color: '#F6B628',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
