import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import{FontAwesome} from 'react-native-vector-icons';

// Importando as páginas
import TabButton from './tabbar.route';
import Ajuda from '../../pages/user/ajuda';
import Sair from '../../pages/log/Sair';

// Ícones
const HomeIcon = require('../../assets/icons/icon-home-azul.png');
const AjudaIcon = require('../../assets/icons/icon-ajuda.png');

const Drawer = createDrawerNavigator();

export default function DrawerTab() {
    const route = useRoute();
    const userId = route.params?.id; // Usa optional chaining para evitar erros se id não existir

    return (
        <Drawer.Navigator screenOptions={{ title: '' }}>
            <Drawer.Screen
                name='home'
                component={TabButton}
                initialParams={{ userId }}
                options={{
                    drawerIcon: () => (
                        <View style={styles.box}>
                              <FontAwesome name="home" size={30} color="#1A478A"/>
                            {/* <Image source={HomeIcon} style={styles.img} /> */}
                            <Text style={styles.txt}>Home</Text>
                        </View>
                    )
                }}
            />

            <Drawer.Screen
                name='Ajuda'
                initialParams={{ userId }}
                component={Ajuda}
                options={{
                    drawerIcon: () => (
                        <View style={styles.box}>
                            <FontAwesome name="exclamation-circle" size={30} color="#1A478A"/>
                            {/* <Image source={AjudaIcon} style={styles.img} /> */}
                            <Text style={styles.txt}>Ajuda</Text>
                        </View>
                    )
                }}
            />

            <Drawer.Screen
                name='Sair'
                component={Sair}
                options={{
                    drawerIcon: () => (
                        <View style={styles.box}>
                             <FontAwesome name="sign-out" size={30} color="#1A478A"/>
                            {/* <Ionicons name="exit" size={24} color="black" /> */}
                            <Text style={styles.txt}>Sair</Text>
                        </View>
                    )
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    box: {
        flexDirection: "row",
        alignItems: "center",
    },
    img: {
        width: 25,
        height: 25,
    },
    txt: {
        color: '#021C58',
        marginLeft: 10,
    },
});
