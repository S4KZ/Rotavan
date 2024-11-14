import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from 'react-native-vector-icons';
import { FontAwesome5 } from 'react-native-vector-icons';

// Importando as páginas
import Home from '../../pages/user/home';
import Perfil from '../../pages/user/perfil';
import Avisos from '../../pages/user/avisos';
import Presenca from '../../pages/user/presenca';

// Ícones
const HomeIcon = require('../../assets/icons/icon-home-azul.png');
const HomeIconY = require('../../assets/icons/icon-home.png');
const PerfilIcon = require('../../assets/icons/icon-perfil.png');
const PerfilIconY = require('../../assets/icons/icon-perfil-amarelo.png');
const PresIcon = require('../../assets/icons/icon-presenca-azul.png');
const PresIconY = require('../../assets/icons/icon-presenca.png');
const AvisosIcon = require('../../assets/icons/icon-avisos-azul.png');
const AvisosIconY = require('../../assets/icons/icon-avisos.png');

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window'); // Obter a largura da tela

export default function TabButton() {
    const route = useRoute();
    const userId = route.params?.userId;
    // console.log(userId);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    borderRadius: 4,
                    height: 90,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.75,
                    shadowRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                initialParams={{ userId }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <View style={styles.highlighWrapper}>
                                    <TouchableOpacity style={styles.highlighted}>
                                        <FontAwesome5 name="home" size={30} color="#1A478A" />
                                    </TouchableOpacity>

                                </View>
                            );
                        }
                        return (
                            <View style={styles.box}>
                                <FontAwesome5 name="home" size={30} color="#1A478A" />
                                <Text style={styles.title}>Home</Text>
                            </View>
                        );
                    }
                }}
            />


            <Tab.Screen
                name='Perfil'
                component={Perfil}
                initialParams={{ userId }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <View style={styles.highlighWrapper}>
                                    <TouchableOpacity style={styles.highlighted}>
                                        <FontAwesome5 name="user-circle" size={35} color="#1A478A" />
                                    </TouchableOpacity>

                                </View>
                            );
                        }
                        return (
                            <View style={styles.box}>
                                <FontAwesome5 name="user-circle" size={35} color="#1A478A" />
                                <Text style={styles.title}>Perfil</Text>
                            </View>
                        );
                    }
                }}
            />


            <Tab.Screen
                name='Presenca'
                component={Presenca}
                initialParams={{ userId }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <View style={styles.highlighWrapper}>
                                    <TouchableOpacity style={styles.highlighted}>
                                        <FontAwesome5 name="user-check" size={30} color="#1A478A" />
                                    </TouchableOpacity>

                                </View>
                            );
                        }
                        return (
                            <View style={styles.box}>
                                <FontAwesome5 name="user-check" size={30} color="#1A478A" />
                                <Text style={styles.title}>Presença</Text>
                            </View>
                        );
                    }
                }}
            />


            <Tab.Screen
                name='Avisos'
                component={Avisos}
                initialParams={{ userId }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <View style={styles.highlighWrapper}>
                                    <TouchableOpacity style={styles.highlighted}>
                                        <FontAwesome name="bell" size={30} color="#1A478A" />
                                    </TouchableOpacity>

                                </View>
                            );
                        }
                        return (
                            <View style={styles.box}>
                                <FontAwesome name="bell" size={30} color="#1A478A" />
                                <Text style={styles.title}>Avisos</Text>
                            </View>
                        );
                    }
                }}
            />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 0.25 * width, //
        top: 0.08 * width
    },
    txt: {
        fontSize: 12,
        color: '#021C58',
    },
    txtFocus: {
        fontSize: 12,
        color: '#FAB428',
    },
    highlighWrapper: {
        position: 'absolute',
        top: -5,
        width: 90,
        alignSelf: 'center',
        borderRadius: 60,
        padding: 10,
        backgroundColor: '#fff',
    },

    highlighted: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6B628',
        borderRadius: 50,
        padding: 15,
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
        color: "#1A478A",
        bottom: 4,
        top: 4,
    }
});
