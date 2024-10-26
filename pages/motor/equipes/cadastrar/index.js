import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../../../config/config.json';


export default function CadastrarEquipe() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};
  // console.log(userId);
  const [selectedTurno, setSelectedTurno] = useState(''); // Estado para o valor selecionado do Picker
  const [turnos, setTurnos] = useState([]);
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: ''
  });


  useEffect(() => {
    if (userId) {
      HandleTurno(userId);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      HandleTurno(userId);
    });

    return unsubscribe;
  }, [userId, navigation]);



  // Função para buscar os turnos
  const HandleTurno = async (userId) => {
    try {
      const ress = await fetch(config.urlRootNode + '/turno', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });
      const data = await ress.json();
      const turnos = data.turnos;
      if (Array.isArray(turnos)) {
        setTurnos(turnos);
      } else {
        console.error('A resposta não contém uma array de resultados.');
      }
    } catch (error) {
      console.error('Erro ao buscar turnos:', error);
    }
  };


  async function buscarEndereco(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        alert('CEP não encontrado');
      } else {
        setEndereco({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf
        });
      }

    } catch (error) {
      alert('Erro ao buscar o endereço. Tente novamente.');
    }
  }

  async function handleCadastrarEquipe() {
    if (selectedTurno === '' || nomeEquipe === '' || cep === '' || !endereco.logradouro) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    try {
      const response = await fetch(config.urlRootNode + '/cadEquip', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeEquipe,
          selectedTurno,
          cep,
          endereco,
          userId,
        }),
      });

      const data = await response.json();
      console.log(data);
      if(data.results === true){
        alert('Equipe cadastrada com sucesso!');
      }else{
        alert('Não foi possível cadastrar a equipe. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar equipe:', error);
      alert('Erro ao cadastrar equipe. Tente novamente.');
    }
    
  }

  const onTurnoChange = (itemValue) => {

    if (itemValue) {
      console.log('Turno selecionado:', itemValue); // Adicione esse console.log para imprimir o valor de itemValue
      setSelectedTurno(itemValue);
      // handleEquipe(itemValue);
      //OBS: LEMBRAR-SE QUE itemValue é o id do turno selecionado
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Cadastrar Equipe</Text>
        {/* <Icon name="users" size={30} color="#F6B628" style={styles.icon} />
    */}

        <View style={styles.card}>
          <Picker
            selectedValue={selectedTurno}
            style={styles.picker}
            onValueChange={(itemValue) => onTurnoChange(itemValue)} // Chama a função quando um turno é selecionado
          >
            <Picker.Item label='Nenhum turno selecionado' value='' />
            {turnos.length > 0 ? (
              turnos.map((turno, index) => (
                <Picker.Item key={index} label={turno.turPeriodo} value={turno.turId} />
              ))
            ) : (
              <Picker.Item label='Nenhum turno disponível' value='' />
            )}
          </Picker>
        </View>

        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder="Nome da equipe"
            value={nomeEquipe} // Ligando o estado ao TextInput
            onChangeText={(text) => setNomeEquipe(text)} // Atualiza o nome da equipe no estado
          />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite o CEP"
            value={cep}
            onChangeText={(text) => {
              const cleanText = text.replace(/\D/g, '');
              setCep(cleanText);
            }}
            keyboardType="numeric"
            maxLength={8}
            onBlur={() => {
              if (cep.length === 8) {
                buscarEndereco(cep);
              }
            }}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.input2}>Endereço: {endereco.logradouro}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.input2}>Bairro: {endereco.bairro}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.input2}>Cidade: {endereco.cidade}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.input2}>UF: {endereco.uf}</Text>
        </View>

        <TouchableOpacity style={styles.botaoConf} onPress={handleCadastrarEquipe}>
          <Text style={styles.texto}>Cadastrar Equipe</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 23,
    color: '#1A478A',
    fontWeight: 'bold',
    marginBottom: 20,
    top: 50,
  },
  form: {
    padding: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    top: 50,
    marginBottom: 60,
  },
  icon: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#1A478A',
    borderRadius: 8,
  },
  botaoConf: {
    width: 290,
    height: 50,
    backgroundColor: '#1A478A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 150,
  },
  texto: {
    color: '#F6B628',
    fontSize: 20,
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
  input2: {
    height: 50,
    width: 300,
    margin: 1,
    borderColor: '#CCCCCC',
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: '#696969',
    backgroundColor: '#f4f4f4',
  },
});
