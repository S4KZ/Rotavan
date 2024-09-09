import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import TabButton from './tabbar.route';

//importando paginas
import Perfil from '../../pages/perfil';
import Config from '../../pages/cfg';
import Ajuda from '../../pages/ajuda';

const HomeIcon = require('../../assets/icons/icon-home-azul.png');
const ProfileIcon = require('../../assets/icons/profile.png');
const ConfigIcon = require('../../assets/icons/icon-config.png');
const AjudaIcon = require('../../assets/icons/icon-ajuda.png');

const Drawer = createDrawerNavigator();

export default function DrawerTab(){
    return(
        
            <Drawer.Navigator 
            screenOptions={
                {
                    title: ''
                }
            }>
                <Drawer.Screen name='Home' component={TabButton} options={
                    {   
                        drawerIcon: () => {
                        return(
                            <View style={styles.box}>           
                            <Image source={HomeIcon} style={styles.img} name="home"/>
                            <Text style={styles.txt}>Home</Text>
                            </View>
                        );
                        }
                      
                    }
                }/>

                <Drawer.Screen name='Perfil' component={Perfil} options={
                                    {   
                                        drawerIcon: () => {
                                        return(
                                            <View style={styles.box}>           
                                            <Image source={ProfileIcon} style={styles.img} name="perfil"/>
                                            <Text style={styles.txt}>Perfil</Text>
                                            </View>
                                        );
                                        }
                                    
                                    }
                                }/>

                <Drawer.Screen name='config' component={Config} options={
                                    {   
                                        drawerIcon: () => {
                                        return(
                                            <View style={styles.box}>           
                                            <Image source={ConfigIcon} style={styles.img} name="config"/>
                                            <Text style={styles.txt}>Configuração</Text>
                                            </View>
                                        );
                                        }
                                    
                                    }
                                }/>

                <Drawer.Screen name='ajuda' component={Ajuda} options={
                                                    {   
                                                        drawerIcon: () => {
                                                        return(
                                                            <View style={styles.box}>           
                                                            <Image source={AjudaIcon} style={styles.img} name="config"/>
                                                            <Text style={styles.txt}>Ajuda</Text>
                                                            </View>
                                                        );
                                                        }
                                                    
                                                    }
                                                }/>

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
    txt:{
      color: '#1A478A',
      left: 10,
    },

  });
