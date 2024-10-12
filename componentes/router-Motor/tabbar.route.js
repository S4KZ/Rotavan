// tabbar.route.js
import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import{FontAwesome} from 'react-native-vector-icons';
import{FontAwesome5} from 'react-native-vector-icons';

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
          paddingHorizontal:10,
          paddingVertical:10,
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
                <FontAwesome name="home" size={30} color="#1A478A"/>
                </TouchableOpacity>
                 
                </View>
              );
            }
            return (
              <View style={styles.box}>
               <FontAwesome name="home" size={30} color="#1A478A"/>
                <Text style={styles.title}>Home</Text>
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
                <View style={styles.highlighWrapper}>
                <TouchableOpacity style={styles.highlighted}>
               <FontAwesome name="users" size={30} color="#1A478A"/>
               </TouchableOpacity>
                
               </View>
              );
            }
            return(
              <View style={styles.box}>
                <FontAwesome5 name="users" size={30} color="#1A478A"/>
                <Text style={styles.title}>Equipes</Text>
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
                <View style={styles.highlighWrapper}>
                <TouchableOpacity style={styles.highlighted}>
               <FontAwesome5 name="user-check" size={27} color="#1A478A"/>
               </TouchableOpacity>
                
               </View>
              );
            }
            return(
              <View style={styles.box}>
                  <FontAwesome5 name="user-check" size={27} color="#1A478A"/>
                <Text style={styles.title}>Presença</Text>
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
                <View style={styles.highlighWrapper}>
                <TouchableOpacity style={styles.highlighted}>
               <FontAwesome name="bell" size={30} color="#1A478A"/>
               </TouchableOpacity>
                
               </View>
              );
            }
            return(
              <View style={styles.box}>
                <FontAwesome name="bell" size={30} color="#1A478A"/>
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
  highlighWrapper: {
    position: 'absolute',
    top: -10,
    alignSelf:'center',
    borderRadius: 50,
    padding:10,
    backgroundColor: '#fff',
},

highlighted:{
    backgroundColor: '#F6B628',
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