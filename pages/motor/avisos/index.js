import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert,Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../../config/config.json';

import Enviar from './enviar';

const ilustra = require('../../../assets/icons/aviso.png');

function Tela() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};

  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    if (userId) {
      handleAvisos(userId);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      handleAvisos(userId);
    });

    return unsubscribe;
  }, [userId, navigation]);

  const handleAvisos = async (userId) => {
    try {
      const response = await fetch(config.urlRootNode + '/avisos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ useId: userId }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      if (data.results) {
        setAvisos(data.results);
      } else {
        console.error('Resposta da API não contém "results" ou está vazia:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar avisos:', error);
    }
  };

  const deleteAviso = async (avisoId) => {
    console.log(avisoId);
    const res = await fetch(config.urlRootNode + '/delAvisos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avisoId }),
    });
    const data = await res.json();
    console.log(data.tipo);

    if (data) {
      alert(data.tipo);
      handleAvisos(userId);
    }
  };

  const confirmDelete = (avisoId) => {
    Alert.alert(
      'Excluir aviso',
      'Você tem certeza que deseja excluir este aviso?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteAviso(avisoId) },
      ]
    );
    handleAvisos(userId);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Image source={ilustra} style={styles.ilustra} />


        <View style={styles.box3}>
          <Text style={styles.title}>Avisos</Text>

          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Enviar')}>
            <Icon name="file-text-o" size={35} color="#FFF" />
            <Text style={styles.addButtonText}>Digite aqui um novo aviso</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>Já enviados</Text>

          {avisos.length > 0 ? (
            avisos.map((aviso, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.cardContent}>
                  <Icon name="exclamation-circle" size={28} color="#1A478A" style={styles.icon} />
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{aviso.avTitulo}</Text>
                    <Text style={styles.cardDescription}>{aviso.avAss}</Text>
                    <Text style={styles.cardDate}>{aviso.avData}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(aviso.avId)}>
                  <Icon name="trash" size={28} color="#FF0000" />
                  <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noAvisos}>Não há avisos enviados</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default function EnviarNav() {
  const Stack = createNativeStackNavigator();
  const route = useRoute();
  const { userId } = route.params || {};

  return (
    <Stack.Navigator>
      <Stack.Screen
        initialParams={{ userId }}
        name="Tela"
        component={Tela}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        initialParams={{ userId }}
        name="Enviar"
        component={Enviar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10, // Adicionei para espaçar lateralmente
  },
  box3: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 1.3,
    elevation: 25,
    marginBottom: 30,
    top: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center', // Centraliza o conteúdo dentro do box
  },
  title: {
    fontSize: 26,
    color: '#FAB428',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#1A478A',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  ilustra: {
    width: '100%',
    height: 290,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A478A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 50,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center', // Centraliza o conteúdo dentro do card
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: '#1A478A',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  cardDate: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o botão excluir
    marginTop: 10,
  },
  deleteText: {
    marginLeft: 10,
    color: '#FF0000',
    fontWeight: 'bold',
  },
  noAvisos: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
});
