import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker'; // Importa o Picker
import config from '../../../config/config.json';
import Adicionar from './adicionar';
import Excluir from './excluir';
import Turnos from './turnos';
import Cadastrar from './cadastrar';

const ilusEqui = require("../../../assets/icons/globo.png");

const { width, height } = Dimensions.get('window');

function EquipesTela() {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params || {};

    const [equipes, setEquipes] = useState([]);
    const [selectedTurno, setSelectedTurno] = useState(''); // Estado para o valor selecionado do Picker
    const [turnos, setTurnos] = useState([]);

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



    //função para buscar as lista dos alunos do turno
    const handleEquipe = async (userId) => {
        try {
            const response = await fetch(config.urlRootNode + '/equipe', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pasIdEquipe: userId }),
            });

            const data = await response.json();
            const results = data.results;

            if (Array.isArray(results)) {
                setEquipes(results);
            } else {
                console.error('A resposta não contém uma array de resultados.');
            }
        } catch (error) {
            console.error('Erro ao buscar dados da equipe:', error);
        }
    };
    //vai fazer aparecer a lista de passageiro de acordo com o id do turno
    const onTurnoChange = (itemValue) => {
        setSelectedTurno(itemValue);
        if (itemValue) {
            console.log('Turno selecionado:', itemValue); // Adicione esse console.log para imprimir o valor de itemValue
            handleEquipe(itemValue);
           
            //OBS: LEMBRAR-SE QUE itemValue é o id do turno selecionado
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
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

                        {/* Botão de editar adicionado */}
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Turnos')}>
                            <Text style={styles.editButtonText}>Editar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                        <TouchableOpacity style={styles.item}>
                            <Icon name="users" size={35} color="#1A478A" style={styles.icon} />
                            <Text style={styles.title}>Sua equipe</Text>
                        </TouchableOpacity>

                        <View style={styles.row2}>
                            {equipes.length > 0 ? (
                                equipes.map((item, index) => (
                                    <View key={index} style={styles.infobox}>
                                        <Text style={styles.label}>{item.nome}</Text>
                                        <Text style={styles.info}>{item.email}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.info}>Nenhum membro encontrado</Text>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.botaoConf} onPress={() => navigation.navigate('Menu', { userId, selectedTurno })}>
                        <Text style={styles.texto}>Editar Equipes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

function Menu() {
    const navigation = useNavigation();
    const route = useRoute();
  // Garante que userId e o itemValue(turno) é acessado de forma segura
  const { userId, selectedTurno } = route.params || {}; 
  console.log(selectedTurno);
    return (
        <View style={styles.container}>
            <ScrollView>
                <SafeAreaView>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Adicionar', { userId, selectedTurno })}>
                        <Text style={styles.text}>Adicionar integrante</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Excluir', { userId, selectedTurno })}>
                        <Text style={styles.text}>Excluir integrante</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastrar', { userId, selectedTurno })}>
                        <Text style={styles.text}>Cadastrar equipe</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
            <TouchableOpacity style={styles.botaoConf} onPress={() => navigation.navigate('EquipesTela', { userId, selectedTurno })}>
                <Text style={styles.texto}>Voltar para Equipes</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function Equipes() {
    const Stack = createNativeStackNavigator();
    const route = useRoute();
    const { userId } = route.params || {};

    return (
        <Stack.Navigator>
            <Stack.Screen name="EquipesTela" initialParams={{ userId }} component={EquipesTela} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" initialParams={{ userId }} component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name='Adicionar' initialParams={{ userId }} component={Adicionar} options={{ headerShown: false }} />
            <Stack.Screen name='Excluir' initialParams={{ userId }} component={Excluir} options={{ headerShown: false }} />
            <Stack.Screen name='Cadastrar' initialParams={{ userId }} component={Cadastrar} options={{ headerShown: false }} />
            <Stack.Screen name='Turnos' initialParams={{ userId }} component={Turnos} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
    box3: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 1.3,
        elevation: 25,
        marginBottom: 30,
        top: 20,
        width: '98%', // Ajustado para ser responsivo
        maxWidth: 400, // Limite máximo
    },
    ilustra: {
        width: '100%',
        height: height * 0.35, // Altura relativa à tela
        resizeMode: 'contain',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fFF',
        borderRadius: 5,
        marginBottom: 10,
    },
    item1: {
        flexDirection: 'row',
        bottom: 30,
        marginHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    box: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 30,
        width: '100%', // Ajustado para ser responsivo
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
        marginBottom: 30,
        width: '100%', // Ajustado para ser responsivo
    },
    row2: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    infobox: {
        width: '100%',
        marginBottom: 30,
        marginLeft: 30,
    },
    title: {
        fontSize: 20, // Reduzido
        color: '#F6B628',
        fontWeight: "bold",
        textAlign: 'center',
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
    label: {
        fontSize: 14, // Reduzido
        fontWeight: 'bold',
        color: '#1A478A',
    },
    info: {
        fontSize: 14, // Reduzido
        textAlign: 'left',
    },
    botaoConf: {
        width: '80%', // Ajustado para ser responsivo
        height: 50,
        backgroundColor: '#1A478A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 5,
        marginBottom: 110,
    },
    botao: {
        width: 250, // Ajustado para ser responsivo
        height: 50,
        backgroundColor: '#F6B628',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 40,
        marginBottom: 5,
    },
    texto: {
        color: '#F6B628',
        fontSize: 14, // Reduzido
        fontWeight: 'bold',
    },
    text: {
        color: '#1A478A',
        fontSize: 14, // Reduzido
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 20,
    },
    editButton: {
        backgroundColor: '#F6B628',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    editButtonText: {
        color: '#1A478A',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

