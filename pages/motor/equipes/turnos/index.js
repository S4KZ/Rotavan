import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdicionarTurno from '../adicionarTurno';
import ExcluirTurno from '../excluirTurno';


function Tela() {
  const navigation = useNavigation(); // Obtém o objeto de navegação

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicione ou exclua seu turno</Text>

      {/* Card para adicionar um novo turno */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('AdicionarTurno')} 
      >
        <Icon name="plus-circle" size={30} color="#1A478A" style={styles.icon} />
        <Text style={styles.cardText}>Adicionar Novo Turno</Text>
      </TouchableOpacity>

      {/* Card para excluir um turno */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ExcluirTurno')} 
      >
        <Icon name="trash" size={30} color="#1A478A" style={styles.icon} />
        <Text style={styles.cardText}>Excluir Turno</Text>
      </TouchableOpacity>

      <Text style={styles.title1}>Turnos já adicionados</Text>

      {/* Cards para os turnos já adicionados */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => console.log('Manhã clicado')}
      >
        <Icon name="sun-o" size={30} color="#FFC107" style={styles.icon} />
        <Text style={styles.cardText}>Turno Manhã</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => console.log('Tarde clicado')}
      >
        <Icon name="cloud" size={30} color="#FF9800" style={styles.icon} />
        <Text style={styles.cardText}>Turno Tarde</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => console.log('Noite clicado')}
      >
        <Icon name="moon-o" size={30} color="#3F51B5" style={styles.icon} />
        <Text style={styles.cardText}>Turno Noite</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Turnos() {
  const Stack = createNativeStackNavigator();
  const route = useRoute();
  const { userId } = route.params || {};

  return (
      <Stack.Navigator>
        <Stack.Screen initialParams={{ userId }} name="Tela" component={Tela}options={{ headerShown: false }}/>
          <Stack.Screen name='AdicionarTurno' initialParams={{ userId }} component={AdicionarTurno} options={{ headerShown: false }} />
          <Stack.Screen name='ExcluirTurno' initialParams={{ userId }} component={ExcluirTurno} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
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
  icon: {
    marginRight: 10,
  },
  cardText: {
    fontSize: 18,
    color: '#1A478A',
    fontWeight: 'bold',
  },
  title1: {
    marginBottom: 40,
    top: 20,
    fontSize: 25,
    color: '#F6B628',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    color: '#F6B628',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

