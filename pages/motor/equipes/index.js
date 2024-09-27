import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../../config/config.json';
import Adicionar from './adicionar';
import Excluir from './excluir';
import Turnos from './turnos';

const ilusEqui = require("../../../assets/icons/ilustra-Equipes.png");

function EquipesTela() {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params || {};
    const [equipes, setEquipes] = useState([]);

    //recarrega a tela quando foca
    useEffect(() => {
        if (userId) {
            handleEquipe(userId);
        }

        const unsubscribe = navigation.addListener('focus', () => {
            handleEquipe(userId);
        });

        return unsubscribe;
    }, [userId, navigation]);
    //fim do reload

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

    return (
        <ScrollView>
            <View style={styles.container}>
      
                <Image source={ilusEqui} style={styles.ilustra} />
                <View style={styles.box3}>
                
                    <View style={styles.card}>
                        
                    <TouchableOpacity onPress={() => navigation.navigate('Turnos') }>
                        <Text style={styles.title1}>Meus turnos</Text>
                        
                        <Text style={styles.subtitle}>Consulte aqui seus turnos!</Text>
                        <Icon name="clock-o" size={50} color="#1A478A" style={styles.item1} />
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
                                        <Text style={styles.label}>{item.useNome}</Text>
                                        <Text style={styles.info}>{item.useEmail}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.info}>Nenhum membro encontrado</Text>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.botaoConf} onPress={() => navigation.navigate('Menu')}>
                        <Text style={styles.texto}>Editar Equipes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

function Menu() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView>
                <SafeAreaView>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Adicionar')}>
                        <Text style={styles.text}>Adicionar integrante</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Excluir')}>
                        <Text style={styles.text}>Excluir integrante</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
            <TouchableOpacity style={styles.botaoConf} onPress={() => navigation.navigate('EquipesTela')}>
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
        padding: 40,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 1.3,
        elevation: 25,
        marginBottom: 30,
        top: 20,
    },
    ilustra: {
        width: 450,
        height: 340,
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
        bottom:30,
       marginHorizontal:10,
    
      },

    icon: {
        marginRight: 10,

    },
    icon1: {
      right:10,
   
    },
    box: {
        backgroundColor: "#FFF",
        padding: 20,
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
    card: {
        padding: 20,
        borderRadius: 10,
        maxWidth: 350,
        height:130,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 30,
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
        fontSize: 25,
        color: '#F6B628',
        fontWeight: "bold",
        textAlign: 'center',
    },
    title1: {
        fontSize: 25,
        left:70,
        top:20,
        color: '#F6B628',
        fontWeight: "bold",
        textAlign: 'left',  
    },
    subtitle: {
        fontSize: 16,
        top:20,
        left:70,
        color: '#1A478A',
        fontWeight: "bold",
        textAlign: 'left',
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
        marginHorizontal: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 5,
        marginBottom: 110,
        marginLeft: 40,
    },
    botao: {
        width: 250,
        height: 50,
        backgroundColor: '#F6B628',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 40,
        marginBottom: 5,
    },
    texto: {
        color: '#F6B628',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        color: '#1A478A',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
