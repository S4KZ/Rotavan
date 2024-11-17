import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import * as Animatable from 'react-native-animatable';
import config from '../../../../config/config.json';

import { useNavigation } from '@react-navigation/native';

export default function UserScreen({ route }) {
  const navigation = useNavigation();
  const [cep, setCep] = useState('');
  const [cell, setCell] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const cadastroInicial = route.params.cadastroInicial; // Dados do cadastro inicial
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  // Handle CEP change and fetch address info
  useEffect(() => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setEndereco({
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              uf: data.uf,
            });
          }
        })
        .catch((err) => console.error(err));
    }
  }, [cep]);




  const limparCampos = (valor) => {
    return valor.replace(/\D/g, ''); // Remove tudo que não for número
  };
  console.log("Dados iniciais: ", cadastroInicial)
  const tipoUsuario = "passageiro"
  const dadosIniciais = cadastroInicial
  const handleSubmit = async () => {
    // Garante que o estado 'endereco' foi atualizado corretamente com os dados do CEP
    const dadosEspecificos = {
      telefone: limparCampos(cell),
      cep: cep,
      rua: logradouro || endereco.logradouro, // Garantir que o valor do estado 'logradouro' seja passado
      bairro: bairro || endereco.bairro,     // Garantir que o valor do estado 'bairro' seja passado
      cidade: cidade || endereco.cidade,     // Garantir que o valor do estado 'cidade' seja passado
      uf: uf || endereco.uf                  // Garantir que o valor do estado 'uf' seja passado
    };

    console.log("dados especificos: ", dadosEspecificos);

    try {
      const response = await fetch(config.urlRootNode + '/cadastrar-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dadosEspecificos, dadosIniciais, tipoUsuario }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Cadastro realizado com sucesso!');
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('Welcome');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro Passageiro</Text>
      <Animatable.View animation="fadeInUp" style={styles.box}>
        <View style={styles.form}>
          <TextInputMask
            style={styles.input}
            placeholder="Telefone"
            type="cel-phone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            value={cell}
            onChangeText={setCell}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite o CEP"
            value={cep}
            onChangeText={(text) => setCep(text.replace(/\D/g, ''))}
            keyboardType="numeric"
            maxLength={8}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite a Rua"
            value={logradouro || endereco.logradouro} // Usa o valor do estado ou o endereço do CEP
            onChangeText={setLogradouro}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite o Bairro"
            value={bairro || endereco.bairro} // Usa o valor do estado ou o bairro do CEP
            onChangeText={setBairro}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite a Cidade"
            value={cidade || endereco.cidade} // Usa o valor do estado ou a cidade do CEP
            onChangeText={setCidade}
          />

        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite a UF"
            value={uf || endereco.uf} // Usa o valor do estado ou o UF do CEP
            onChangeText={setUf}
          />
        </View>
        <View style={styles.form}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
  },
  box: {
    top: 100,
    padding: 38,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 15,
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 250,
    height: 53,
    backgroundColor: '#1A478A',
    margin: 10,
  },
  buttonText: {
    color: '#F6B628',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
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
  inputInfo: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  title: {
    fontSize: 25,
    color: '#F6B628',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 55,
  },
};

