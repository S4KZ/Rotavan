import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdicionarTurno = () => {
  const [selectedTurno, setSelectedTurno] = useState('');
  const [horarioIda, setHorarioIda] = useState('');
  const [horarioVolta, setHorarioVolta] = useState('');

  const handleTurnoSelect = (turno) => {
    setSelectedTurno(turno);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o Turno</Text>

      {/* Botões de Turno */}
      <View style={styles.turnosContainer}>
        <TouchableOpacity
          style={[
            styles.turnoButton,
            selectedTurno === 'Manhã' && styles.selectedButton
          ]}
          onPress={() => handleTurnoSelect('Manhã')}
        >
          <Icon name="sun-o" size={30} color="#FFC107" style={styles.icon} />
          <Text style={styles.buttonText}>Manhã</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.turnoButton,
            selectedTurno === 'Tarde' && styles.selectedButton
          ]}
          onPress={() => handleTurnoSelect('Tarde')}
        >
          <Icon name="cloud" size={30} color="#FF9800" style={styles.icon} />
          <Text style={styles.buttonText}>Tarde</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.turnoButton,
            selectedTurno === 'Noite' && styles.selectedButton
          ]}
          onPress={() => handleTurnoSelect('Noite')}
        >
          <Icon name="moon-o" size={30} color="#3F51B5" style={styles.icon} />
          <Text style={styles.buttonText}>Noite</Text>
        </TouchableOpacity>
      </View>

      {/* Inputs de Horários */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Horário de Ida"
          placeholderTextColor="#999"
          value={horarioIda}
          onChangeText={setHorarioIda}
        />
        <TextInput
          style={styles.input}
          placeholder="Horário de Volta"
          placeholderTextColor="#999"
          value={horarioVolta}
          onChangeText={setHorarioVolta}
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Turno</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#1A478A',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  turnosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  turnoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 5,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: '#1A478A',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A478A',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#1A478A',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F6B628',
  },
});

export default AdicionarTurno;
