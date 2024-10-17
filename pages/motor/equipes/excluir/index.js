import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import config from '../../../../config/config.json'; // Ajuste o caminho conforme necessário


export default function Excluir() {
  const [emails, setEmails] = useState([]);
  const [pasId, setPasId] = useState([]);
  const route = useRoute();
  // Garante que userId e o itemValue(turno) é acessado de forma segura
  const { userId, selectedTurno } = route.params || {}; 
  // console.log(selectedTurno);

  useEffect(() => {
    if (selectedTurno) {
      fetchEmails(selectedTurno); // passando o id do turno
    }
  }, [selectedTurno]);

  async function fetchEmails(userId) { // passando para o função o id do turno
    try {
      const response = await fetch(config.urlRootNode + '/equipe', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pasIdEquipe: userId, //tá passando o id do turno
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const results = data.results || [];
      setEmails(results.map(item => item.email)); // Atualiza o estado com os e-mails
      setPasId(results.map(item => item.id)); // Armazena os IDs dos usuários
    } catch (error) {
      console.error('Erro ao buscar e-mails:', error);
    }
  }

  // Função para mostrar o alerta de confirmação
  async function HandleExcluir(index) {
    Alert.alert(
      'Confirmação',
      `Você tem certeza que deseja excluir este usuário: ${emails[index]}?`,
      [
        {
          text: 'Não',
          onPress: () => console.log('Ação cancelada'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            const pasID = pasId[index];
            console.log(pasID);
            try {
              const reqs = await fetch(config.urlRootNode + '/del', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  pass: pasID,
                }),
              });
  
              let ress = await reqs.json();
  
              if (ress.msg === 'removido') {
                alert('Removido com sucesso!');
                // Atualiza a lista de emails
                const updatedEmails = emails.filter((_, i) => i !== index);
                const updatedPasId = pasId.filter((_, i) => i !== index);
                setEmails(updatedEmails);
                setPasId(updatedPasId);
              } else {
                alert('Erro ao remover!');
              }
            } catch (error) {
              console.error('Erro ao excluir usuário:', error);
            }
          },
          style: 'destructive',
        },
      ],
    );
  }
  

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, { color: '#1A478A' }]}>Excluir integrante</Text>

        <View style={styles.box}>
          <TouchableOpacity style={styles.item}>
            <Icon name="users" size={35} color="#1A478A" style={styles.icon} />
            <Text style={[styles.title, { color: '#F6B628' }]}>Sua equipe</Text>
          </TouchableOpacity>

          <View style={styles.row2}>
            {emails.length > 0 ? (
              emails.map((email, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => HandleExcluir(index)}  // Passa o índice correto
                  style={[styles.item, { backgroundColor: '#FFFF' }]}
                >
                  <View style={styles.infobox}>
                    <Text style={styles.info}>{email}</Text>
                  </View>
                  <Icon name="trash-o" size={23} color="#1A478A" style={styles.iconn} />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.info}>Nenhum e-mail encontrado</Text>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.botaoConf}>
          <Text style={styles.texto}>Voltar</Text>
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
  row2: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  infobox: {
    width: '100%',
    alignItems: 'stretch',
    marginBottom: 10,
    marginLeft: 10,
  },
  box: {
    backgroundColor: "#FFF",
    padding: 20,
    maxWidth: 350,
    minWidth: 330,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5,
  },
  icon: {
    marginRight: 15,
  },
  iconn: {
    marginLeft: 270,
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    marginBottom: 35,
    top: 10,
    color: '#F6B628',
    fontWeight: "bold",
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A478A',
  },
  info: {
    fontSize: 16,
    textAlign: 'left',
  },
  botaoConf: {
    width: 290,
    height: 50,
    backgroundColor: '#1A478A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
    marginBottom: 100,
  },
  texto: {
    color: '#F6B628',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
