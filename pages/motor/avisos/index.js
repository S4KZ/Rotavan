import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../../config/config.json';

import Enviar from './enviar';

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

  // Função para buscar os avisos do servidor
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
        throw new Error(`Erro: ${response.status}`); // Se o status não for OK, lançar erro
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

  // Função para excluir um aviso
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
    // console.log(res.status);
    const data = await res.json(); // pega a resposta e vira em json
    console.log(data.tipo);
    
    if(data){
      alert(data.tipo);
      handleAvisos(userId); // Atualiza a lista de avisos após a exclusão
    }

  };

  // Confirmar exclusão
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
      <ScrollView style={styles.mgS}>
        <View style={styles.container}>
          <Text style={styles.title}>Avisos</Text>
          <View style={styles.row2}>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Enviar')}>
              <Icon name="file-text-o" size={35} color="#1A478A" style={styles.icon} />
              <Text style={styles.subtitle}>Digite aqui</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Já enviados</Text>

          {avisos.length > 0 ? (
            avisos.map((aviso, index) => (
              <View style={styles.row2} key={index}>
                <TouchableOpacity style={styles.item}>
                  <Icon name="exclamation-circle" size={28} color="#1A478A" style={styles.icon} />
                  <Text style={styles.subtitle}>{aviso.avTitulo}</Text>
                </TouchableOpacity>
                <Text style={styles.paragraph}>{aviso.avAss}</Text>
                <Text style={styles.paragraphh}>{aviso.avData}</Text>

                {/* Botão de excluir */}
                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(aviso.avId)}>
                  <Icon name="trash" size={28} color="#FF0000" />
                  <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.title}>Não há avisos enviados</Text>
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
        name='Tela'
        component={Tela}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        initialParams={{ userId }}
        name='Enviar'
        component={Enviar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  mgS: {
    marginBottom: 100,
  },
  title: {
    fontSize: 25,
    color: '#FAB428',
    fontWeight: 'bold',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  icon: {
    marginRight: 15,
  },
  subtitle: {
    fontSize: 18,
    color: '#1A478A',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    textAlign: 'justify',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  paragraphh: {
    fontSize: 12,
    color: '#1A478A',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  row2: {
    flexDirection: 'column',
    padding: 20,
    borderRadius: 10,
    top: 20,
    width: '95%',
    minHeight: 120,
    maxHeight: 250,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 30,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteText: {
    marginLeft: 10,
    color: '#FF0000',
    fontWeight: 'bold',
  },
});
