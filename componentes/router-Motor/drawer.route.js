import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import{FontAwesome} from 'react-native-vector-icons';

import TabButton from './tabbar.route';
import Ajuda from '../../pages/motor/ajuda';
import Perfil from '../../pages/motor/perfil';
import Sair from '../../pages/log/Sair';

import Ionicons from '@expo/vector-icons/Ionicons';
const AjudaIcon = require('../../assets/icons/icon-ajuda.png');
const HomeIcon = require('../../assets/icons/icon-home-azul.png');
const ProfileIcon = require('../../assets/icons/profile.png');

const Drawer = createDrawerNavigator();

export default function DrawerTab() {
  const route = useRoute();
  const userId = route.params?.id; // Usa optional chaining para evitar erros se id não existir

  // console.log(userId);

  return (
    <Drawer.Navigator screenOptions={{ title: '' }}>
      <Drawer.Screen name='home' initialParams={{userId}} component={TabButton} options={{
        drawerIcon: () => (
          <View style={styles.box}>
              <FontAwesome name="home" size={30} color="#1A478A"/>
            {/* <Image source={HomeIcon} style={styles.img} /> */}
            <Text style={styles.txt}>Home</Text>
          </View>
        )
      }} />
      <Drawer.Screen name='Perfil' initialParams={{userId}} component={Perfil} options={{
        drawerIcon: () => (
          <View style={styles.box}>
            <FontAwesome name="user-circle-o" size={30} color="#1A478A"/>
            {/* <Image source={ProfileIcon} style={styles.img} /> */}
            <Text style={styles.txt}>Perfil</Text>
          </View>
        )
      }} />
      <Drawer.Screen name='Ajuda' component={Ajuda} options={{
        drawerIcon: () => (
          <View style={styles.box}>
             <FontAwesome name="exclamation-circle" size={30} color="#1A478A"/>
            {/* <Image source={AjudaIcon} style={styles.img} /> */}
            <Text style={styles.txt}>Ajuda</Text>
          </View>
        )
      }} />
      <Drawer.Screen name='Sair' component={Sair} options={{
        drawerIcon: () => (
          <View style={styles.box}>
              <FontAwesome name="sign-out" size={30} color="#1A478A"/>
            {/* <Ionicons name="exit" size={24} color="black" /> */}
            <Text style={styles.txt}>Sair</Text>
          </View>
        )
      }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: 25,
    height: 25,
  },
  txt: {
    color: '#021C58',
    left: 10,
  },
});
