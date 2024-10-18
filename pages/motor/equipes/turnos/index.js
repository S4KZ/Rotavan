import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const handleCardPress = (cardTitle) => {
    Alert.alert(`Você clicou em: ${cardTitle}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicione ou exclua seu turno</Text>

      {/* Card para adicionar um novo turno */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress('Adicionar Novo Turno')}
      >
        <Icon name="plus-circle" size={30} color="#1A478A" style={styles.icon} />
        <Text style={styles.cardText}>Adicionar Novo Turno</Text>
      </TouchableOpacity>

      {/* Card para excluir um turno */}
      <TouchableOpacity style={styles.card}
        onPress={() => handleCardPress('Excluir Turno')}
      >
        <Icon name="trash" size={30} color="#1A478A" style={styles.icon} />
        <Text style={styles.cardText}>Excluir Turno</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alterado para começar na parte superior
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 4, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    marginBottom: 20, // Diminuído para puxar o título mais para cima
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default App;
