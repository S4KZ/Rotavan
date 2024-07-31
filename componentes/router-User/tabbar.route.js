//TabBar
import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



//tem que importar as paginas que vão navegar
import Home from '../../pages/user/home';
import Equipe from '../../pages/user/equipes';
import Avisos from '../../pages/user/avisos';
import Presenca from '../../pages/user/presenca';


//chamanado as imagens
const HomeIcon = require('../../assets/icons/icon-home-azul.png');
const HomeIconY = require('../../assets/icons/icon-home.png');

const EquipeIcon = require('../../assets/icons/icon-equipe-azul.png');
const EquipeIconY = require('../../assets/icons/icon-equipe.png');

const PresIcon = require('../../assets/icons/icon-presenca-azul.png')
const PresIconY = require('../../assets/icons/icon-presenca.png');

const AvisosIcon = require('../../assets/icons/icon-avisos-azul.png');
const AvisosIconY = require('../../assets/icons/icon-avisos.png')


const Tab = createBottomTabNavigator(); // variavel que vai chamar a função do tabNavigator


export default function TabButton() {
  return (
    <Tab.Navigator screenOptions={{ // screen options é tipo um css pra essa barra d navegação
            tabBarShowLabel: false,
            tabBarStyle:{
              position: 'absolute',
              bottom: 10,
              left: 7,
              right: 7,
              borderRadius: 4,
              height: 80,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.75,
              shadowRadius: 5,
            }
        
    }}>
    {/* aqui chama as paginas importadas o name pode colocar qualquer nome, mas o component 
    tem que ser o msm q o do import */}
      <Tab.Screen 
      name="Home" 
      component={Home} 
      options={{ //css para os botãos dessa barra de navegação
        headerShown: false, //tira o header das paginas

        tabBarIcon: ({focused}) =>{ //uma função anonima para adicionar
            // atributos tipo hover e Focus no css e html e vamos usar pra colocar os icones
            if(focused){// quando o item tiver focado/selecionado
              return (
              <View style={styles.box}>
              <Image source={HomeIconY} style={styles.img} name="home"/>
              <Text style={styles.txtFocus}>HOME</Text>
              </View>
              );
            } //se não 
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
      options={
        {
          headerShown: false,
          tabBarIcon: ({focused}) =>{ 
            if(focused){
              return(
                <View style={styles.box}>
                  <Image source={EquipeIconY} style={styles.img} name="equipe"/>
                  <Text style={styles.txtFocus}>EQUIPE</Text>
                </View>
              );
            }
            return(
              <View style={styles.box}>
                <Image source={EquipeIcon} style={styles.img} name="equipe"/>
                <Text style={styles.txt}>EQUIPE</Text>
              </View>
            );
          }
        }
      }
      />


      <Tab.Screen 
      name="Presença" 
      component={Presenca}
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
      name="Avisos" 
      component={Avisos}
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) =>{
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: 30,
    height: 30,
  },
  txt:{
    color: '#021C58'
    
  },
   txtFocus:{
    color: '#FAB428'
  }
});


