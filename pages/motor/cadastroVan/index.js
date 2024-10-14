import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInputMask } from 'react-native-masked-text';

export default function CadastroVan() {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [vans, setVans] = useState([]);

  const cadastrarVan = () => {
    if (!placa || !modelo || !ano || !capacidade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novaVan = { id: Math.random().toString(), placa, modelo, ano, capacidade };
    setVans(prevVans => [...prevVans, novaVan]);
    setPlaca('');
    setModelo('');
    setAno('');
    setCapacidade('');
    alert('Van cadastrada com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Van</Text>

      <Animatable.View animation={"fadeInUp"} style={styles.box}>
        <View style={styles.form}>
          <TextInputMask
            style={styles.textInput}
            placeholder="Placa"
            type={'custom'}
            options={{
              mask: 'AAA-9999', // Máscara para a placa
            }}
            value={placa}
            onChangeText={text => setPlaca(text)}
          />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Modelo"
            value={modelo}
            onChangeText={text => setModelo(text)}
          />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Ano"
            value={ano}
            onChangeText={text => setAno(text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Capacidade"
            value={capacidade}
            onChangeText={text => setCapacidade(text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.form}>
          <TouchableOpacity style={styles.button} onPress={cadastrarVan}>
            <Text style={styles.buttonText}>Cadastrar Van</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={vans}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.vanItem}>
              <Text>Placa: {item.placa}</Text>
              <Text>Modelo: {item.modelo}</Text>
              <Text>Ano: {item.ano}</Text>
              <Text>Capacidade: {item.capacidade} passageiros</Text>
            </View>
          )}
        />
      </Animatable.View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  box: {
    top: 90,
    padding: 38,
    // borderTopLeftRadius: 35,
    // borderTopRightRadius: 35,
    // backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: { width: 15, height: 15 },
    // shadowOpacity: 0.7,
    // shadowSpread: 5,
    // elevation: 15,
    flex: 1,
  },
  title: {
    top: 70,
    fontSize: 28,
    color: '#F6B628',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    width: 300,
    margin: 1,
    borderColor: '#CCCCCC',
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f4f4f4',
  },
  button: {
    padding: 5,
    borderRadius: 10,
    width: 280,
    height: 43,
    backgroundColor: '#1A478A',
    margin: 10,
  },
  buttonText: {
    color: '#F6B628',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  form: {
    padding: 10,
  },
  vanItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
};
