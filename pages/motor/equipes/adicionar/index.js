import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import config from '../../../../config/config.json';
import { Picker } from '@react-native-picker/picker'; // Importa o Picker

export default function Adicionar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};
  // console.log(userId);
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail
  const [equipe, setEquipes] = useState('');
  const [escola, setEscola] = useState('');

  useEffect(() => {
    if (userId) {
        handleEquipe(userId);
    }
    const unsubscribe = navigation.addListener('focus', () => {
        handleEquipe(userId);
    });

    return unsubscribe;
}, [userId, navigation]);


const handleEquipe = async (userId) => {
  try {
    const ress = await fetch(config.urlRootNode+'/selEquipe', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',},
          body: JSON.stringify({ id: userId }),
    });
    const data = await ress.json();
    const equipes = data.results;
     console.log(data);
    if(Array.isArray(equipes)){
      setEquipes(equipes);
    }else {
      console.error('A resposta não contém uma array de resultados.');
  }

  } catch (error) {
    console.error('Erro ao buscar equipes:', error);
  }
}





  async function handleAdicionar() {
    const { userId } = route.params || {}; // Garante que userId é acessado de forma segura

    try {
      let reqs = await fetch(config.urlRootNode + '/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // Adiciona o e-mail ao corpo da requisição
          equipe: escola, // Adiciona a escola e o turno selecionado
        }),
      });
      let ress = await reqs.json();
      if (ress.msg === 'carregou') {
        alert('Adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar!');
      }
    } catch (error) {
      console.error('Erro ao adicionar integrante:', error);
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, { color: '#1A478A' }]}>Adicionar um novo integrante</Text>

        {/* Envolve o Picker dentro de uma View com borda */}
        <View style={styles.pickerContainer}>


          <Picker
            selectedValue={escola}
            style={styles.picker}
            onValueChange={(itemValue) => setEscola(itemValue)}
          >
            <Picker.Item label="Selecione o endereço e turno" value="" />
            {equipe.length > 0 ? (
              equipe.map((item) => (
                <Picker.Item label={item.nome_equipe + " - " + item.nome_turno} value={item.equipe_id} key={item.equipe_id} />
              ))
            ): (
              <Picker.Item label="Carregando..." value="" />
            )
          }
            

          </Picker>

        </View>

        <TextInput
          style={styles.input}
          placeholder="Email do integrante:"
          value={email} // Valor do TextInput
          onChangeText={setEmail} // Atualiza o estado com o valor inserido
        />

        <TouchableOpacity style={styles.botaoConf} onPress={handleAdicionar}>
          <Text style={styles.texto}>Salvar</Text>
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
    fontWeight: 'bold',
    marginBottom: 20,
    top: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1A478A',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  
    width: 350,
    top: 200,
    marginBottom: 60,
  },
  // Estilo da View ao redor do Picker para adicionar borda
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#1A478A',
    borderRadius: 8,
    marginBottom: 20,
    width: 350,
    top: 200,
  },
  picker: {
    height: 50,
    width: '100%',
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
    marginTop: 2,
    marginBottom: 500,
    top: 170,
  },
  texto: {
    color: '#F6B628',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
