import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Sair() {
    const navigation = useNavigation();

    useEffect(() => {
        // Função que será executada uma vez ao montar o componente
        const handleExit = () => {
            Alert.alert("Você saiu..");
            navigation.navigate('Welcome'); // Navega para a tela 'Welcome'
        };

        handleExit();
    }, [navigation]); // Executa o efeito quando o componente é montado e navegação está disponível

    return null; // Não é necessário renderizar nada
}
