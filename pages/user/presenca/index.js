import React from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ilusConfi = require("../../../assets/icons/presen.png");

export default function ConfirmacaoVan() {
  const handleCardPress = (title) => {
    Alert.alert(
      'Confirmação',
      `Você tem certeza que deseja selecionar: ${title}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log(`${title} selecionado`) },
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
            onPress={() => handleCardPress("Não vou")}
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
            onPress={() => handleCardPress("Não volto")}
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
            onPress={() => handleCardPress("Vou sumir")}
          >
            <FontAwesome name="times" size={40} color="#fff" style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Faltas consecutivas</Text>
              <Text style={styles.cardText}>Você avisará o motorista que não irá com a van durante um tempo.</Text>
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
    bottom:15,
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
