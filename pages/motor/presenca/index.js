import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Importa o Picker
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../../config/config.json';
const ilusEqui = require("../../../assets/icons/ilustra-presen.png");

export default function Equipes() {
  const [selectedTurno, setSelectedTurno] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [pasIda, setPasIda] = useState([]); // Lista de quem vai na ida
  const [pasVolta, setPasVolta] = useState([]); // Lista de quem vai na volta
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};

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

  // Função para buscar os alunos da ida com base no turno selecionado
  const HandleIda = async (idTurno) => {
    try {
      const ress = await fetch(config.urlRootNode + '/ida', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idturno: idTurno }),
      });
      const data = await ress.json();
      const resultado = data.resultado;
      if (Array.isArray(resultado)) {
        setPasIda(resultado);
      } else {
        console.error('A resposta não contém uma array de resultados.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da ida:', error);
    }
  };

  // Função para buscar os alunos da volta com base no turno selecionado
  const HandleVolta = async (idTurno) => {
    try {
      const ress = await fetch(config.urlRootNode + '/volta', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idturno: idTurno }),
      });
      const data = await ress.json();
      const resultado = data.resultado;
      //console.log('Dados da volta:', resultado); // Adicione esse console.log para imprimir os dados retornados pela API
      if (Array.isArray(resultado)) {
        setPasVolta(resultado);
      } else {
        console.error('A resposta não contém uma array de resultados.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da volta:', error);
    }
  };
  
  const onTurnoChange = (itemValue) => {
    setSelectedTurno(itemValue);
    if (itemValue) {
      HandleIda(itemValue);   // Atualiza a lista de ida
      HandleVolta(itemValue); // Atualiza a lista de volta
     // console.log('Turno selecionado:', itemValue); // Adicione esse console.log para imprimir o valor de itemValue
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <Image source={ilusEqui} style={styles.ilustra} />
        <View style={styles.box3}>

          <View style={styles.card}>
            <TouchableOpacity>
              <Text style={styles.title1}>Meus turnos</Text>
              <Text style={styles.subtitle}>Consulte aqui seus turnos!</Text>
              <Icon name="clock-o" size={50} color="#1A478A" style={styles.item1} />
            </TouchableOpacity>

            {/* Picker para selecionar o turno */}
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

          <View style={styles.box}>
            <Text style={styles.title}>Veja quem irá hoje na ida</Text>
            <Text style={styles.label}>Usuário</Text>
            {pasIda.length > 0 ? (
              pasIda.map((pas, index) => (
                <TouchableOpacity key={index}>
                  <Text style={styles.info}>{pas.useNome}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.info}>Nenhum passageiro na ida.</Text>
            )}
          </View>

          <View style={styles.box}>
            <Text style={styles.title}>Veja quem irá voltar hoje</Text>
            <Text style={styles.label}>Usuário</Text>
            {pasVolta.length > 0 ? (
              pasVolta.map((pas, index) => (
                <TouchableOpacity key={index}>
                  <Text style={styles.info}>{pas.useNome}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.info}>Nenhum passageiro na volta.</Text>
            )}
          </View>

          <TouchableOpacity style={styles.botaoConf}>
            <Text style={styles.texto}>Iniciar rota</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  ilustra: {
    width: '80%', // ajuste para ser mais responsivo
    height: undefined,
    aspectRatio: 1, // mantém a proporção da imagem
    resizeMode: 'contain',
    marginBottom: 10,
  },
  box3: {
    flexDirection: 'column',
    padding: 20,
    borderRadius: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 1.3,
    elevation: 20,
    marginBottom: 30,
    width: '97%', // ajuste para se adequar à tela
  },
  box: {
    top: 25,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    width: '100%', // para preencher a largura do box3
  },
  title: {
    fontSize: 22,
    color: '#F6B628',
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1A478A',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  botaoConf: {
    width: '100%', // largura total do botão
    height: 50,
    backgroundColor: '#1A478A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 100,
  },
  texto: {
    color: '#F6B628',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
    top: 20,
    width: '100%', // Ajustado para ser responsivo
  },
  title1: {
    fontSize: 20, // Reduzido
    left: 70,
    top: 20,
    color: '#F6B628',
    fontWeight: "bold",
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14, // Reduzido
    top: 20,
    left: 70,
    color: '#1A478A',
    fontWeight: "bold",
    textAlign: 'left',
  },
  item1: {
    flexDirection: 'row',
    bottom: 30,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
});
