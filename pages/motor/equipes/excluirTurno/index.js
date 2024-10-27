import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import config from '../../../../config/config.json';

const ExcluirTurno = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    if (userId) {
      HandleTurno(userId);
    } 
    const unsubscribe = navigation.addListener('focus', () => {
    HandleTurno(userId);
  });

  return unsubscribe;
}, [userId, navigation]);

  // Função para buscar os turnos
  const HandleTurno = async (userId) => {
    try {
      const ress = await fetch(config.urlRootNode + '/turno', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });
      const data = await ress.json();
      const turnos = data.turnos;
      if (Array.isArray(turnos)) {
        setTurnos(turnos);
      } else {
        console.error('A resposta não contém uma array de resultados.');
      }
    } catch (error) {
      console.error('Erro ao buscar turnos:', error);
    }
  };

  const handleExcluirTurno = async () => {
    if (!selectedTurno) {
      Alert.alert('Selecione um turno para excluir.');
      return;
    }

    Alert.alert(
      `Tem certeza que deseja excluir o turno ${selectedTurno}?`,
      `ISSO IRÁ APAGARÁ TODAS AS EQUIPES DESSE TURNO`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: async () => await excluirTurno(selectedTurno) }
      ]
    );
  };

  const excluirTurno = async (turId) => {
    try {
      const response = await fetch(`${config.urlRootNode}/excluir-turno`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ turId }),  // Aqui mandamos o JSON corretamente
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Sucesso', 'Turno excluído com sucesso!');
        HandleTurno(userId);  // Atualiza a lista de turnos após a exclusão
      } else {
        Alert.alert('Erro', data.message || 'Erro ao excluir turno.');
      }
    } catch (error) {
      console.error('Erro ao excluir turno:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir o turno.');
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Excluir Turno</Text>

      {/* Renderizando os turnos com ícones */}
      {turnos.length > 0 ? (
        turnos.map((turno, index) => {
          // Escolhendo o ícone com base no valor do turPeriodo
          const iconName = turno.turPeriodo === "Manhã" ? "sun-o" :
            turno.turPeriodo === "Tarde" ? "cloud" :
            turno.turPeriodo === "Noite" ? "moon-o" : "question"; // Ícone padrão caso o período seja desconhecido

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                selectedTurno === turno.turId && styles.selectedCard // Aplica estilo de seleção
              ]}
              onPress={() => setSelectedTurno(turno.turId)} // Muda para o ID do turno
            >
              <Icon name={iconName} size={30} color="#FFC107" style={styles.icon} />
              <Text style={styles.cardText}>{turno.turPeriodo + " - id: " + turno.turId}</Text>
 </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.cardText}>Nada encontrado</Text>
      )}

      {/* Botão para excluir o turno selecionado */}
      <TouchableOpacity
        style={styles.excluirButton}
        onPress={handleExcluirTurno}
      >
        <Icon name="trash" size={20} color="#fff" />
        <Text style={styles.excluirButtonText}>Excluir Turno</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    color: '#F6B628',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#1A478A', // Cor de fundo para o card selecionado
  },
  icon: {
    marginRight: 10,
  },
  cardText: {
    fontSize: 18,
    color: '#1A478A',
    fontWeight: 'bold',
  },
  excluirButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3D00',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  excluirButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ExcluirTurno;