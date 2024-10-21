import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ExcluirTurno = () => {
  const [selectedTurno, setSelectedTurno] = useState(null);

  const handleExcluirTurno = () => {
    if (!selectedTurno) {
      Alert.alert('Selecione um turno para excluir.');
      return;
    }

    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o turno ${selectedTurno}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => Alert.alert(`Turno ${selectedTurno} excluído com sucesso!`) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Excluir Turno</Text>

      {/* Botões para selecionar o turno */}
      <TouchableOpacity
        style={[
          styles.card,
          selectedTurno === 'Manhã' && styles.selectedCard
        ]}
        onPress={() => setSelectedTurno('Manhã')}
      >
        <Icon name="sun-o" size={30} color="#FFC107" style={styles.icon} />
        <Text style={styles.cardText}>Turno Manhã</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          selectedTurno === 'Tarde' && styles.selectedCard
        ]}
        onPress={() => setSelectedTurno('Tarde')}
      >
        <Icon name="cloud" size={30} color="#FF9800" style={styles.icon} />
        <Text style={styles.cardText}>Turno Tarde</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          selectedTurno === 'Noite' && styles.selectedCard
        ]}
        onPress={() => setSelectedTurno('Noite')}
      >
        <Icon name="moon-o" size={30} color="#3F51B5" style={styles.icon} />
        <Text style={styles.cardText}>Turno Noite</Text>
      </TouchableOpacity>

      {/* Botão para excluir o turno */}
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
