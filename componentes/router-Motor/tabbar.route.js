// tabbar.route.js
import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';

import Home from '../../pages/motor/home';
import Avisos from '../../pages/motor/avisos';
import Presenca from '../../pages/motor/presenca';
import Equipe from '../../pages/motor/equipes'

const HomeIcon = require('../../assets/icons/icon-home-azul.png');
const HomeIconY = require('../../assets/icons/icon-home.png');

const EquipeIcon = require('../../assets/icons/icon-equipe-azul.png');
const EquipeIconY = require('../../assets/icons/icon-equipe.png');

const PresIcon = require('../../assets/icons/icon-presenca-azul.png')
const PresIconY = require('../../assets/icons/icon-presenca.png');

const AvisosIcon = require('../../assets/icons/icon-avisos-azul.png');
const AvisosIconY = require('../../assets/icons/icon-avisos.png')

const Tab = createBottomTabNavigator();

export default function TabButton(){
  const route = useRoute();
  const { userId } = route.params || {}; // Garante que userId é acessado de forma segura

  //  console.log(userId);

  return(
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
                <View style={styles.box}>
                  <Image source={HomeIconY} style={styles.img} />
                  <Text style={styles.txtFocus}>HOME</Text>
                </View>
              );
            }
            return (
              <View style={styles.box}>
                <Image source={HomeIcon} style={styles.img} name="home"/>
                <Text style={styles.txt}>HOME</Text>
              </View>
            );
          }
        }}
      />

<Tab.Screen 
      name="Equipe" 
      component={Equipe} 
      initialParams={{ userId }}
      options={
        {
          headerShown: false,
          tabBarIcon: ({focused}) =>{ 
            if(focused){
              return(
                <View style={styles.box}>
                  <Image source={EquipeIconY} style={styles.imgg} name="equipe"/>
                  <Text style={styles.txtFocus}>EQUIPES</Text>
                </View>
              );
            }
            return(
              <View style={styles.box}>
                <Image source={EquipeIcon} style={styles.imgg} name="equipe"/>
                <Text style={styles.txt}>EQUIPES</Text>
              </View>
            );
          }
        }
      }
      />


<Tab.Screen 
      name="Presença" 
      component={Presenca}
      initialParams={{ userId }}
      options={
        {
          headerShown: false,
          tabBarIcon: ({focused}) =>{
            if(focused){
              return(
                <View style={styles.box}>
                  <Image source={PresIconY} style={styles.img} name="presença"/>
                  <Text style={styles.txtFocus}>PRESENÇA</Text>
                </View>
              );
            }
            return(
              <View style={styles.box}>
                <Image source={PresIcon} style={styles.img} name="presença"/>
                <Text style={styles.txt}>PRESENÇA</Text>
              </View>
            );
          }
        }
      }
      />





      <Tab.Screen
        name='Avisos'
        component={Avisos}
        initialParams={{ userId }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if(focused){
              return(
                <View style={styles.box}>
                  <Image source={AvisosIconY} style={styles.img} name="avisos"/>
                  <Text style={styles.txtFocus}>AVISOS</Text>
                </View>
              );
            }
            return(
              <View style={styles.box}>
                <Image source={AvisosIcon} style={styles.img} name="avisos"/>
                <Text style={styles.txt}>AVISOS</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 28,
    height: 26,
  },
  txt: {
    fontSize: 12,
    color: '#333',
  },
  txtFocus: {
    fontSize: 12,
    color: '#FAB428',
  },
  imgg: {
    width: 45,
    height: 25,
  },

});