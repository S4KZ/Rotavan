import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import config from '../../../../config/config.json'; // Ajuste o caminho conforme necessário

export default function Excluir() {
  const [emails, setEmails] = useState([]);
  const route = useRoute();
  const { userId } = route.params || {}; // Garante que userId é acessado de forma segura

  useEffect(() => {
    if (userId) {
      fetchEmails(userId);
    }
  }, [userId]);

  async function fetchEmails(userId) {
    try {
      console.log(`Fetching emails for userId: ${userId}`); // Verifique o userId
      const response = await fetch(config.urlRootNode + '/equipe', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pasIdEquipe: userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API response:', data); // Verifique a resposta da API

      const results = data.results || [];
      setEmails(results.map(item => item.useEmail)); // Atualize o estado com os e-mails
    } catch (error) {
      console.error('Erro ao buscar e-mails:', error);
    }
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

                <TouchableOpacity key={index} style={[styles.item, { backgroundColor: '#FFFF' }]}>
                      <View key={index} style={styles.infobox}>
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
          <Text style={styles.texto}>Excluir</Text>
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
    marginLeft:10,

},

  box: {
    backgroundColor: "#FFF",
    padding: 20,
    maxWidth:350,
    minWidth:330,
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
    marginBottom:35,
    top:10,
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
