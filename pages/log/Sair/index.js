import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { View, Button } from 'react-native';
import Welcome from '../welcome'

export default function Sair(){
    const navigation = useNavigation();

    const Exit = ()=>{
        Alert.alert("Você saiu..");
        navigation.navigate('Welcome');
    }

    return (
        Exit()
    );
}