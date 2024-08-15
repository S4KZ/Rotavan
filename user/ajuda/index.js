import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Ajuda(){
  const [motivo, setMotivo] = React.useState('');

  return(
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Algum problema?</Text>
          <Text style={styles.headerSubtitle}>Fale com nossa equipe de suporte!</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Quais são os problemas enfrentados?</Text>

          <View style={styles.selectContainer}>
            <Picker
            style={styles.pickerBox}
              selectedValue={motivo}
              onValueChange={(itemValue) => setMotivo(itemValue)}
            >
              <Picker.Item label="Erro ao fazer login" value="erro_login" />
              <Picker.Item label="Problema com pagamento" value="problema_pagamento" />
              <Picker.Item label="Outro" value="outro" />
            </Picker>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              placeholder="Nome"
              style={styles.input}
            />
            <TextInput
              placeholder="E-mail"
              style={styles.input}
            />
          </View>

          <TextInput
            placeholder="Descreva o problema"
            multiline={true}
            numberOfLines={4}
            style={styles.textArea}
          />

          <View style={styles.button}>
            <Button title="Enviar Chamado" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#021C58',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#021C58',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectContainer: {
    display: 'flex',
    justifyContent: 'center',
    top: 20,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 5,
    borderRadius: 10,
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: 120,
    padding: 10,
    borderRadius: 10,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  button: {
    marginTop: 5,
    borderRadius: 40,
    alignItems: 'center',
  },
  pickerBox: {
    borderColor: '#021C58',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  }
});