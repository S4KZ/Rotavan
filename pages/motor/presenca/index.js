import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Importa o Picker
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../../config/config.json';
import io from 'socket.io-client'; // Importa o Socket.IO



const ilusEqui = require("../../../assets/icons/ilustra-presen.png");


export default function Equipes() {
  const [selectedTurno, setSelectedTurno] = useState('');//turno selecionado
  const [turnos, setTurnos] = useState([]); //lista dos turnos
  const [pasIda, setPasIda] = useState([]); // Lista de quem vai na ida
  const [pasVolta, setPasVolta] = useState([]); // Lista de quem vai na volta
  const [loading, setLoading] = useState(false); //mensagem de carregamento
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};
  const [socket, setSocket] = useState(null); // Estado para gerenciar o socket


  useEffect(() => {
    const socketConnection = io(config.urlRootNode);

    HandleTurno(userId);

    socketConnection.on('faltaida', () => {
      console.log("Atualizando dados de ida devido a faltaida");
      if (selectedTurno) {
        HandleIda(selectedTurno);
      }
    });

    socketConnection.on('faltavolta', () => {
      console.log("Atualizando dados de volta devido a faltavolta");
      if (selectedTurno) {
        HandleVolta(selectedTurno);
      }
    });

    socketConnection.on('Faltas', () => {
      console.log("Atualizando dados de volta devido a faltavolta");
      if (selectedTurno) {
        HandleIda(selectedTurno);
        HandleVolta(selectedTurno);
      }
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [selectedTurno]);





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

        
        

        // Acessando as informações
        // embarque.forEach((local) => {
        //   console.log(`Endereço: ${local.endereco}`);
        //   console.log(`CEP: ${local.cep}`);
        //   console.log(`Bairro: ${local.bairro}`);
        //   console.log(`Cidade: ${local.cidade}`);
        //   console.log(`UF: ${local.uf}`);
        // });

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

      if (Array.isArray(resultado)) {
        setPasVolta(resultado);
        // console.log("TODOS QUE VÃO VOLTAR");



       
        
       

        // Acessando as informações
        // desembarque.forEach((local) => {
        //   console.log(`Endereço: ${local.endereco}`);
        //   console.log(`CEP: ${local.cep}`);
        //   console.log(`Bairro: ${local.bairro}`);
        //   console.log(`Cidade: ${local.cidade}`);
        //   console.log(`UF: ${local.uf}`);
        // });

      } else {
        console.error('A resposta não contém uma array de resultados.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da volta:', error);
    }
  };

 

  const rota = async () => {
    if (!selectedTurno) {
      // Alert.alert("Por favor, selecione um turno antes de iniciar a rota.");
      Alert.alert(
        '',
        'Por favor, selecione um turno antes de iniciar a rota.',
        [
          { text: 'OK', style: 'cancel' },
        ]
      );
      return; // Não prossegue se não houver turno selecionado
    }
  
    setLoading(true); // Exibe o popup
    setTimeout(() => {
      setLoading(false); // Oculta o popup após 3 segundos
      navigation.navigate('Home', { pasIda, pasVolta });
    }, 3000);
  };
  

  const onTurnoChange = (itemValue) => {
    setSelectedTurno(itemValue);
    if (itemValue) {
      HandleIda(itemValue);
      HandleVolta(itemValue);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (userId && selectedTurno) {
        HandleIda(selectedTurno);
        HandleVolta(selectedTurno);
      }
    }, [userId, selectedTurno])
  );



  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>

      <Modal
          transparent={true}
          visible={loading}
          animationType="fade"
        >
          <View style={styles.modalContainer}>
            <View style={styles.popup}>
              <Image source={require("../../../assets/icons/rot.gif")} style={styles.gif} />
              <Text style={styles.loadingText}>Carregando rotas...</Text>
            </View>
          </View>
        </Modal>

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

          <TouchableOpacity style={styles.botaoConf} 
          onPress={rota}
          >
            <Text style={styles.texto} >Iniciar rota</Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  gif: {
    width: 150,
    height : 150,
    resizeMode: 'contain'
  },
  loadingText: {
    color: '#000000',
    marginTop: 0,
    fontSize: 18,
    textAlign: 'center',
    color: '#1A478A',
    fontWeight: "bold",
  },
  ilustra: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
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
    width: '97%',
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
    width: '100%',
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
    width: '100%',
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
    width: '100%',
  },
  title1: {
    fontSize: 20,
    left: 70,
    top: 20,
    color: '#F6B628',
    fontWeight: "bold",
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
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
