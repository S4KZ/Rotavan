import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ilusEqui = require("../../../assets/icons/ilustra-presenConf.png");

export default function Equipes() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <Image source={ilusEqui} style={styles.ilustra} />
        <View style={styles.box3}>
          <View style={styles.box}>
            <Text style={styles.title}>Veja quem irá hoje na ida</Text>
            <Text style={styles.label}>Usuário                    Horário</Text>
            {['Isabelle Vidal', 'Maria Júlia', 'Isabelle Vidal', 'Maria Júlia', 'Isabelle Vidal', 'Maria Júlia'].map((user, index) => (
              <TouchableOpacity key={index}>
                <Text style={styles.info}>{user}                    {6 + Math.floor(index / 2)}:{index % 2 === 0 ? '35' : '40'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.box}>
            <Text style={styles.title}>Veja quem irá voltar hoje</Text>
            <Text style={styles.label}>Usuário                    Horário</Text>
            {['Isabelle Vidal', 'Maria Júlia', 'Isabelle Vidal', 'Maria Júlia', 'Isabelle Vidal', 'Maria Júlia'].map((user, index) => (
              <TouchableOpacity key={index}>
                <Text style={styles.info}>{user}                    {6 + Math.floor(index / 2)}:{index % 2 === 0 ? '35' : '40'}</Text>
              </TouchableOpacity>
            ))}
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
    top:25,
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
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginBottom:100,
  },
  texto: {
    color: '#F6B628',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
