import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';

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
      <Drawer.Screen name='home' component={TabButton} options={{
        drawerIcon: () => (
          <View style={styles.box}>
            <Image source={HomeIcon} style={styles.img} />
            <Text style={styles.txt}>Home</Text>
          </View>
        )
      }} />
      <Drawer.Screen name='Perfil' initialParams={{userId}} component={Perfil} options={{
        drawerIcon: () => (
          <View style={styles.box}>
            <Image source={ProfileIcon} style={styles.img} />
            <Text style={styles.txt}>Perfil</Text>
          </View>
        )
      }} />
      <Drawer.Screen name='Ajuda' component={Ajuda} options={{
        drawerIcon: () => (
          <View style={styles.box}>
            <Image source={AjudaIcon} style={styles.img} />
            <Text style={styles.txt}>Ajuda</Text>
          </View>
        )
      }} />
      <Drawer.Screen name='Sair' component={Sair} options={{
        drawerIcon: () => (
          <View style={styles.box}>
            <Ionicons name="exit" size={24} color="black" />
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
