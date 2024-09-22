import{ useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Avisos() {
  // Estados para controlar os avisos
  const [pendentes, setPendentes] = useState([
    {
      id: 1,
      titulo: 'Não haverá van amanhã',
      descricao: 'A van apresentou um problema de motor, já foi levada para o concerto, porém só ficará pronta amanhã no período da tarde!',
      motorista: 'Motorista Rodrigo',
      data: '08/05/2024 - 19:11h',
    },
  ]);

  const [visualizados, setVisualizados] = useState([
    {
      id: 2,
      titulo: 'Atenção com os horários!',
      descricao: 'Nos últimos dias, tem ocorrido muitos atrasos na hora da ida, então peço por favor para que se atentem aos horários, pois isso prejudica e atrasa sua chegada.',
      motorista: 'Motorista Rodrigo',
      data: '08/05/2024 - 19:11h',
    },
  ]);

  // Função para marcar o aviso como lido
  const marcarComoLido = (id) => {
    const aviso = pendentes.find((aviso) => aviso.id === id);
    if (aviso) {
      setVisualizados([...visualizados, aviso]);
      setPendentes(pendentes.filter((aviso) => aviso.id !== id));
    }
  };

  return (
    <ScrollView> 
      <View style={styles.container}> 

        {/* Pendentes */}
        <Text style={styles.title}>Pendentes</Text>
        {pendentes.length === 0 ? (
          <Text style={styles.emptyText}>Não há avisos pendentes.</Text>
        ) : (
          pendentes.map((aviso) => (
            <View key={aviso.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="error-outline" size={24} color="#FAB428" />
                <Text style={styles.subtitle}>{aviso.titulo}</Text>
              </View>
              <Text style={styles.paragraph}>{aviso.descricao}</Text>
              <Text style={styles.footerText}>{aviso.motorista}</Text>
              <Text style={styles.footerText}>{aviso.data}</Text>
              <TouchableOpacity style={styles.actionButton} onPress={() => marcarComoLido(aviso.id)}>
                <Text style={styles.actionButtonText}>Marcar como Lido</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* Já visualizados */}
        <Text style={styles.title}>Já visualizados</Text>
        {visualizados.length === 0 ? (
          <Text style={styles.emptyText}>Não há avisos visualizados.</Text>
        ) : (
          visualizados.map((aviso) => (
            <View key={aviso.id} style={[styles.card, styles.viewedCard]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="schedule" size={24} color="#1A478A" />
                <Text style={styles.subtitle}>{aviso.titulo}</Text>
              </View>
              <Text style={styles.paragraph}>{aviso.descricao}</Text>
              <Text style={styles.footerText}>{aviso.motorista}</Text>
              <Text style={styles.footerText}>{aviso.data}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#1A478A',
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#1A478A',
    fontWeight: "bold",
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  viewedCard: {
    backgroundColor: '#e6e6e6',
  },
  actionButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FAB428',
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#1A478A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
});
