import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const handleCardPress = (cardTitle) => {
    Alert.alert(`Você clicou em: ${cardTitle}`);
  };

  const cardsData = [
    { id: 1, title: 'Turno da manhã' },
    { id: 2, title: 'Turno da tarde' },
    { id: 3, title: 'Turno da noite' },
  ];

  return (
    <View style={styles.container}>

   <Text style={styles.title}>Seus turnos</Text>

      {cardsData.map(card => (
        <TouchableOpacity
          key={card.id}
          style={styles.card}
          onPress={() => handleCardPress(card.title)}
        >
          <Text style={styles.cardText}>{card.title}</Text>
        </TouchableOpacity>



      ))}






    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    elevation: 4, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 300,
    maxWidth: 350,
    minHeight: 150,
    maxHeight: 200,
    alignItems: 'center',

  },
  cardText: {
    fontSize: 25,
    top:20,
    color: '#F6B628',
    fontWeight: "bold",
    textAlign: 'center',  
  },


title: {
    fontSize: 24,
    top:20,
    left:70,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'center',
},
});

export default App;
