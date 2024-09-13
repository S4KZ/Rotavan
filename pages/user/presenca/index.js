import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const ilusConfi = require("../../../assets/icons/ilustra-Confirmar.png")// o icone

// Configurando o calendário para português
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function ConfirmacaoVan() {
  // Estado para armazenar as datas selecionadas
  const [selectedDates, setSelectedDates] = useState({});

  // Função para selecionar ou deselecionar datas
  const handleDayPress = (day) => {
    const selected = { ...selectedDates };

    // Se a data já está selecionada, desmarcar. Caso contrário, marcar.
    if (selected[day.dateString]) {
      delete selected[day.dateString];
    } else {
      selected[day.dateString] = { selected: true, marked: true, selectedColor: '#1A478A' };
    }

    setSelectedDates(selected);
  };

  // Função para confirmar presença nos dias selecionados
  const confirmarPresenca = () => {
    const diasSelecionados = Object.keys(selectedDates);

    if (diasSelecionados.length === 0) {
      Alert.alert('Erro', 'Nenhum dia foi selecionado!');
      return;
    }

    Alert.alert('Confirmação', `Você confirmou falta para os dias: ${diasSelecionados.join(', ')}`);

    // Exemplo de envio de dados para um servidor
    // fetch('https://seu-servidor.com/api/confirmacao', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ datas: diasSelecionados }),
    // });
  };

  return (
    <ScrollView> 
    <View style={styles.container}>

<Image source={ilusConfi} style={styles.ilustra} /> 
         <View style={styles.box}>
      <Text style={styles.title}>Selecione os dias que você não vai usar a van:</Text>

      <View style={styles.box2}>
      <Calendar
        // Permitir a seleção de múltiplas datas
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        markingType={'multi-dot'} // Exibe múltiplos dias selecionados
      />
     </View>

      <View style={styles.buttonContainer}>

      <TouchableOpacity style={styles.button} onPress={confirmarPresenca}>
            <Text style={styles.buttonText}>Confirmar </Text>
       </TouchableOpacity>
       
      </View>

      {Object.keys(selectedDates).length > 0 && (
        <View style={styles.selectedDatesContainer}>
          <Text style={styles.selectedDatesText}>
            Você selecionou os dias:
            {Object.keys(selectedDates).map((date) => ` ${date}`).join(', ')}
          </Text>
        </View>
      )}
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
  ilustra: { //estilização da imagem

    flex: 1,
    width: 300, // largura desejada da imagem
    height: 300, // altura desejada da imagem
    resizeMode: 'contain', // ajuste de escala da imagem
   marginLeft:50,
  },

  box: {
    flexDirection:'column',
    padding: 40,
    maxHeight:1900,
    minHeight:900,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width:0, height:10 },
    shadowRadius: 1.3,
    elevation: 25,
    marginBottom:30,
    top:20,
    
  },

   box2: {
    flexDirection:'column',
    padding: 40,
    maxHeight:400,
    minHeight:200,
    borderRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width:0, height:10 },
    shadowRadius: 1.3,
    elevation: 5,
    marginBottom:30,
    top:20,
    
  },

  title:{ // estilização do text
    fontSize: 20,
    color: '#F6B628',
    fontWeight: "bold",
    padding: 20, 
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 20,
  
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 250,
    height:45,
    marginLeft:40,
    backgroundColor: '#1A478A',
    margin: 10,
  
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
