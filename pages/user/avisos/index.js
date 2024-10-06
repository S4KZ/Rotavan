import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../../config/config.json';

function Tela() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};
  console.log(userId);

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Avisos Importantes</Text>

          {/* Seção para mostrar os avisos enviados */}
          {avisos.length > 0 ? (
            avisos.map((aviso, index) => (
              <View style={styles.avisoCard} key={index}>
                <TouchableOpacity style={styles.avisoHeader}>
                  <Icon name="exclamation-circle" size={28} color="#FAB428" style={styles.icon} />
                  <Text style={styles.avisoTitle}>{aviso.avTitulo}</Text>
                </TouchableOpacity>
                <Text style={styles.avisoBody}>{aviso.avAss}</Text>
                <Text style={styles.avisoDate}>{aviso.avData}</Text>
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

export default Tela;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
  },
  scroll: {
    width: '100%',
  },
  innerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#1A478A',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  avisoCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  avisoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  avisoTitle: {
    fontSize: 20,
    color: '#1A478A',
    fontWeight: 'bold',
  },
  avisoBody: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
    marginVertical: 10,
  },
  avisoDate: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
  },
  noAvisos: {
    fontSize: 18,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
