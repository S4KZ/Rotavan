import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

const ilusConfi = require("../../../assets/icons/ilustra-Confirmar.png");

// Configuração do calendário em português
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function ConfirmacaoVan() {
  const [motivo, setMotivo] = useState('');
  const [selectedDates, setSelectedDates] = useState({});

  // Seleciona/deseleciona datas
  const handleDayPress = (day) => {
    setSelectedDates((prevDates) => {
      const updatedDates = { ...prevDates };
      updatedDates[day.dateString]
        ? delete updatedDates[day.dateString]
        : (updatedDates[day.dateString] = { selected: true, marked: true, selectedColor: '#1A478A' });
      return updatedDates;
    });
  };

  // Confirma presença nos dias selecionados
  const confirmarPresenca = () => {
    const diasSelecionados = Object.keys(selectedDates);

    if (diasSelecionados.length === 0) {
      Alert.alert('Erro', 'Nenhum dia foi selecionado!');
    } else {
      Alert.alert('Confirmação', `Você confirmou falta para os dias: ${diasSelecionados.join(', ')}`);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={ilusConfi} style={styles.ilustra} />
        <View style={styles.box}>
          <Text style={styles.title}>Selecione os dias que você não vai usar a van:</Text>

          <View style={styles.box2}>
            <Calendar onDayPress={handleDayPress} markedDates={selectedDates} markingType="multi-dot" />
          </View>

          <View style={styles.pickerWrapper}>
            <Picker selectedValue={motivo} onValueChange={(itemValue) => setMotivo(itemValue)} style={styles.pickerBox}>
              <Picker.Item label="Não irei nem retornarei com a van" value="Não irei nem retornarei com a van" />
              <Picker.Item label="Irei com a van mas não retornarei com ela" value=" Irei com a van mas não retornarei com ela" />
              <Picker.Item label="Não irei com a van, mas retornarei com ela" value="Não irei com a van, mas retornarei com ela " />
            </Picker>
          </View>

          {Object.keys(selectedDates).length > 0 && (
            <View style={styles.selectedDatesContainer}>
              <Text style={styles.selectedDatesText}>
                Você selecionou os dias: {Object.keys(selectedDates).join(', ')}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={confirmarPresenca}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    display: 'flex',
  },
  ilustra: {
    flex: 1,
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginLeft: 50,
  },
  box: {
    flexDirection: 'column',
    padding: 40,
    maxHeight: 1900,
    minHeight: 900,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 1.3,
    elevation: 25,
    marginBottom: 30,
    top: 20,
  },
  box2: {
    flexDirection: 'column',
    padding: 40,
    maxHeight: 400,
    minHeight: 200,
    borderRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 1.3,
    elevation: 5,
    marginBottom: 30,
    top: 20,
  },
  title: {
    fontSize: 20,
    color: '#F6B628',
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  pickerWrapper: {
    top:20,
    borderColor: '#F6B628',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  pickerBox: {
    width: '100%',
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 250,
    height: 45,
    marginLeft: 40,
    backgroundColor: '#1A478A',
    marginTop: 20,
  },
  buttonText: {
    color: '#F6B628',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedDatesContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F6B628',
    borderRadius: 5,
  },
  selectedDatesText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
