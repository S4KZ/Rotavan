import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
const ilusConfi = require("../../../assets/icons/presen.png");
import config from '../../../config/config.json';

export default function ConfirmacaoVan() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};
  console.log(userId);

  const handleCase = async (useId, Case) => {
    // console.log(useId, Case);
    switch (Case) {
      case 1:
        // console.log("n vo");
        try {
          const faltas = await fetch(config.urlRootNode + '/faltaIda', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ useId: useId }),
          });
          const data = await faltas.json();
          if (data) {
            Alert.alert('Sucesso!', 'Já avisamos ao motorista que você não irá na ida!');
          } else {
            Alert.alert('Erro!', 'Não conseguimos avisar ao motorista');
          }
        } catch (error) {
          Alert.alert('Erro!', 'houve algum problema na comunição');
        }


        break;
      case 2:
        // console.log("n volto");
        try {
          const faltas = await fetch(config.urlRootNode + '/faltaVolta', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ useId: useId }),
          });
          const data = await faltas.json();
          if (data) {
            Alert.alert('Sucesso!', 'Já avisamos ao motorista que você não irá na volta!');
          } else {
            Alert.alert('Erro!', 'Não conseguimos avisar ao motorista');
          }
        } catch (error) {
          Alert.alert('Erro!', 'houve algum problema na comunição');
        }



        break;
      case 3:
        // console.log("vo sumi");
        try {
          const faltas = await fetch(config.urlRootNode + '/faltas', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ useId: useId }),
          });
          const data = await faltas.json();
          if (data) {
            Alert.alert('Sucesso!', 'Já avisamos ao motorista que você não irá por um tempo...');
          } else {
            Alert.alert('Erro!', 'Não conseguimos avisar ao motorista');
          }
        } catch (error) {
          Alert.alert('Erro!', 'houve algum problema na comunição');
        }
        break;
      case 4:
        // console.log("voltou a escola");
        try {
          const faltas = await fetch(config.urlRootNode + '/retorno', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ useId: useId }),
          });
          const data = await faltas.json();
          if (data) {
            Alert.alert('Sucesso!', 'Já avisamos ao motorista que você voltou!');
          } else {
            Alert.alert('Erro!', 'Não conseguimos avisar ao motorista');
          }
        } catch (error) {
          Alert.alert('Erro!', 'houve algum problema na comunição');
        }
        break;
    }
  }

  const handleCardPress = (title, Case) => {
    Alert.alert(
      'Confirmação',
      `Você tem certeza que deseja selecionar: ${title}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => handleCase(userId, Case) },
      ]
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={ilusConfi} style={styles.ilustra} />
        <View style={styles.box}>
          <Text style={styles.title1}>Confirme sua presença conforme as opções abaixo!</Text>
          <Text style={styles.title}>🚨 ATENÇÃO!</Text>
          <Text style={styles.subtitle}>
            Se você não irá na ida e nem na volta, selecione as opções
            <Text style={styles.highlight}> "Não vou" </Text> e
            <Text style={styles.highlight}> "Não volto"!</Text>
          </Text>

          {/* Card 1 */}
          <TouchableOpacity
            style={[styles.card, styles.card1]}
            onPress={() => handleCardPress("Não vou", 1)}
          >
            <FontAwesome name="thumbs-down" size={40} color="#fff" style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Não vou</Text>
              <Text style={styles.cardText}>Você avisará o motorista que não irá com a van na ida.</Text>
            </View>
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity
            style={[styles.card, styles.card2]}
            onPress={() => handleCardPress("Não volto", 2)}
          >
            <FontAwesome name="bullhorn" size={40} color="#fff" style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Não volto</Text>
              <Text style={styles.cardText}>Você avisará o motorista que não irá com a van na volta.</Text>
            </View>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity
            style={[styles.card, styles.card3]}
            onPress={() => handleCardPress("Vou sumir", 3)}
          >
            <FontAwesome name="times" size={40} color="#fff" style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Faltas consecutivas</Text>
              <Text style={styles.cardText}>Você avisará o motorista que não irá com a van durante um tempo.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.card4]}
            onPress={() => handleCardPress("irei voltar", 4)}
          >
            <FontAwesome name="check" size={40} color="#fff" style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Irei voltar</Text>
              <Text style={styles.cardText}>Você avisará o motorista que  irá com a van durante um tempo.</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  ilustra: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  box: {
    padding: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 1.3,
    elevation: 25,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: '#c2272d',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  title1: {
    fontSize: 18,
    color: '#F6B628',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    textAlign: 'center',
    lineHeight: 24,
    bottom: 15,
  },
  highlight: {
    color: '#F6B628',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  card1: {
    backgroundColor: '#F6B628',
  },
  card2: {
    backgroundColor: '#1A478A',
  },
  card3: {
    backgroundColor: '#c22614',
  },
  card4: {
    backgroundColor: '#1C8701',
    marginBottom: 100,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
  },
});
