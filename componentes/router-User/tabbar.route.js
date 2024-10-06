import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import{FontAwesome} from 'react-native-vector-icons';

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

export default function TabButton() {
    const route = useRoute();
    const userId = route.params?.userId;
    // console.log(userId);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    borderRadius: 4,
                    height: 90,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.75,
                    shadowRadius: 5,
                    justifyContent: 'space-between',
                    paddingHorizontal:20,
                    paddingVertical:10,
                }
            }}
        >
            <Tab.Screen name="Home" component={Home}
            initialParams={{ userId }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {

                        if (focused) { // se ele estiver focado
                            return (
                                // <View style={styles.box}>
                                     <View style={styles.highlighWrapper}>
                                     <TouchableOpacity style={styles.highlighted}>
                                      <FontAwesome name="home" size={30} color="#1A478A"/>
                                    {/* <Image source={HIcon2} style={styles.icon} /> */}
                                    </TouchableOpacity>
                                </View>
                                // </View>
                            );
                        }
                        // se n tiver interação
                        return (
                            <View style={styles.box}>
                             <FontAwesome name="home" size={30} color="#1A478A"/>
                                {/* <Image source={HIcon} style={styles.icon} /> */}
                                <Text style={styles.title}>Home</Text>
                               
                          
                            </View>
                        )

                    }
                }} />


            {/* <Tab.Screen
                name="Perfil"
                component={Perfil}
                initialParams={{ userId }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.box}>
                            <Image source={focused ? PerfilIconY : PerfilIcon} style={styles.imgg} />
                            <Text style={focused ? styles.txtFocus : styles.txt}>PERFIL</Text>
                        </View>
                    ),
                }}
            /> */}
    

    <Tab.Screen name="Perfil" component={Perfil}
     initialParams={{ userId }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {

                        if (focused) { // se ele estiver focado
                            return (
                                // <View style={styles.box}>
                                     <View style={styles.highlighWrapper}>
                                     <TouchableOpacity style={styles.highlighted}>
                                      <FontAwesome name="user-circle-o" size={30} color="#1A478A"/>
                                    {/* <Image source={HIcon2} style={styles.icon} /> */}
                                    </TouchableOpacity>
                                </View>
                                // </View>
                            );
                        }
                        // se n tiver interação
                        return (
                            <View style={styles.box}>
                             <FontAwesome name="user-circle-o" size={30} color="#1A478A"/>
                                {/* <Image source={HIcon} style={styles.icon} /> */}
                                <Text style={styles.title}>Perfil</Text>
                               
                          
                            </View>
                        )

                    }
                }} />


            {/* <Tab.Screen
                name="Presença"
                component={Presenca}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.box}>
                            <Image source={focused ? PresIconY : PresIcon} style={styles.imgP} />
                            <Text style={focused ? styles.txtFocus : styles.txt}>PRESENÇA</Text>
                        </View>
                    ),
                }}
            /> */}

            
    <Tab.Screen name="Presença" component={Presenca}
    initialParams={{ userId }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {

                        if (focused) { // se ele estiver focado
                            return (
                                // <View style={styles.box}>
                                     <View style={styles.highlighWrapper}>
                                     <TouchableOpacity style={styles.highlighted}>
                                      <FontAwesome name="check-square-o" size={30} color="#1A478A"/>
                                    {/* <Image source={HIcon2} style={styles.icon} /> */}
                                    </TouchableOpacity>
                                </View>
                                // </View>
                            );
                        }
                        // se n tiver interação
                        return (
                            <View style={styles.box}>
                             <FontAwesome name="check-square-o" size={30} color="#1A478A"/>
                                {/* <Image source={HIcon} style={styles.icon} /> */}
                                <Text style={styles.title}>Presença</Text>
                               
                            </View>
                        )

                    }
                }} />

                          
    <Tab.Screen name="Avisos" component={Avisos}
    initialParams={{ userId }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {

                        if (focused) { // se ele estiver focado
                            return (
                                // <View style={styles.box}>
                                     <View style={styles.highlighWrapper}>
                                     <TouchableOpacity style={styles.highlighted}>
                                      <FontAwesome name="bell" size={30} color="#1A478A"/>
                                    {/* <Image source={HIcon2} style={styles.icon} /> */}
                                    </TouchableOpacity>
                                </View>
                                // </View>
                            );
                        }
                        // se n tiver interação
                        return (
                            <View style={styles.box}>
                             <FontAwesome name="bell" size={30} color="#1A478A"/>
                                {/* <Image source={HIcon} style={styles.icon} /> */}
                                <Text style={styles.title}>Avisos</Text>
                               
                            </View>
                        )

                    }
                }} />



            {/* <Tab.Screen
                name="Avisos"
                component={Avisos}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.box}>
                            <Image source={focused ? AvisosIconY : AvisosIcon} style={styles.img} />
                            <Text style={focused ? styles.txtFocus : styles.txt}>AVISOS</Text>
                        </View>
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    box: {
        flexDirection: "column",
        alignItems: "center",
    },
    img: {
        width: 28,
        height: 27,
    },
    imgP: {
        width: 32,
        height: 30,
    },
    txt: {
        fontSize: 12,
        color: '#021C58',
    },
    txtFocus: {
        fontSize: 12,
        color: '#FAB428',
    },
    imgg: {
        width: 43,
        height: 32,
    },
    highlighWrapper: {
        position: 'absolute',
        top: -10,
        alignSelf:'center',
        borderRadius: 50,
        padding:10,
        backgroundColor: '#fff',
    },

    highlighted:{
        backgroundColor: '#FAB428',
        borderRadius: 50,
        padding:15,
    },
    title:{
        fontSize: 14,
        marginBottom: 5,
        color:"#1A478A",
        bottom:4,
        top:4,
    }
});
