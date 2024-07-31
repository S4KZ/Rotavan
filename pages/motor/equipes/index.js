import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Adicionar from './adicionar';
import Excluir from './excluir';


const ilusEqui = require("../../../assets/icons/ilustra-Equipes.png")// o icone

function EquipesTela() { // aonde vai trabalhar o visual
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView>
            <SafeAreaView >
                <View >
                <Image source={ilusEqui} style={styles.ilustra} />

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.title}>Turma da manhã</Text>
                            <Text style={styles.subtitle}>Horário da chegada:  7:20h</Text>
                            <Text style={styles.subtitle}>Horário da saída:   15:30h</Text>
                            <Text style={styles.subtitle2}>Local: Escola Maria Julia, Rua José Alves, 450</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.box2}>

                    <TouchableOpacity style={styles.item}>
                        <Icon name="users" size={35} color="#1A478A" style={styles.icon} />
                        <Text style={styles.title}>Sua equipe</Text>
                    </TouchableOpacity>

                    <View style={styles.row2}>
                        <View style={styles.container}>

                            <View style={styles.column}>
                                <Text style={styles.label}>  Usuário                   Email</Text>

                                <TouchableOpacity >
                                    <Text style={styles.info}>Isabelle Vidal    isinha@gmail.com</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.info}>Isabelle Vidal    isinha@gmail.com</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.info}>Isabelle Vidal    isinha@gmail.com</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.info}>Isabelle Vidal    isinha@gmail.com</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.info}>Isabelle Vidal    isinha@gmail.com</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.info}>Isabelle Vidal    isinha@gmail.com</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.info}>Isabelle Vidal    isinha@gmail.com</Text>
                                </TouchableOpacity>







                            </View>

                        </View>
                    </View>
                </View>


                </SafeAreaView>
            </ScrollView>



            <TouchableOpacity style={styles.botaoConf} onPress={() => navigation.navigate('Menu')}>
                <Text style={styles.texto}>Editar Equipes</Text>
            </TouchableOpacity>
        </View>
    );
}

function Menu() { // menuzao
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView>
            <SafeAreaView >
          
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Adicionar')} >
                <Text style={styles.text}>Adicionar integrante</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Excluir')} >
                <Text style={styles.text}>Excluir integrante</Text>
            </TouchableOpacity>
            </SafeAreaView>
            </ScrollView>
            <TouchableOpacity style={styles.botaoConf} onPress={() => navigation.navigate('EquipesTela')} >
                <Text style={styles.texto}>Voltar para Equipes</Text>
            </TouchableOpacity>

        </View>
    );
}



export default function Equipes() { // aqui na mexe aaaaaaaaaaaaa
    const Stack = createNativeStackNavigator();
    return (

        <Stack.Navigator>
            <Stack.Screen name="EquipesTela" component={EquipesTela}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="Menu" component={Menu}
                options={{ headerShown: false }}
            />

            <Stack.Screen name='Adicionar' component={Adicionar} />
            <Stack.Screen name='Excluir' component={Excluir} />
        </Stack.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff'
    },
   
    

    ilustra: { //estilização da imagem
        flex: 1,
        width: 450, // largura desejada da imagem
        height: 340, // altura desejada da imagem
        resizeMode: 'contain', // ajuste de escala da imagem
        // position: 'absolute'  ,     // posicionamento absoluto
        top: 10, // ajusta a posição verticalmente
        marginBottom: 10,

    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },


    box: {
        //estilização
        backgroundColor: "#F4F4F4",
        padding: 20,
        width: "93%",
        height: 430,
        top: 10, //margin top
        borderRadius: 15,
        //posicionamento dos componentes 
        alignItems: "center",
        //colocar sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 40,
    },

    box2: {
        //estilização
        backgroundColor: "#FAFAFA",
        padding: 20,
        width: "88%",
        height: 500,
        top: 10, //margin top
        borderRadius: 15,
        //posicionamento dos componentes 
        alignItems: "center",
        //colocar sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 50,
        marginHorizontal:10,
    },



    row: { // a classe row é pra deixar aquele os items(Text e Image), alinhado um do lado do outro
        //assim n precisando fazer um milhão de margin pra alinhar certo
        display: "flex",
        flexDirection: "row",

        //estilização
        padding: 18,
        borderRadius: 15,
        top: 10,
        width: "88%",
        height: 210,

        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowSpread: 5,
        elevation: 25,
        marginBottom: 40,
        marginHorizontal:10,
    },

    row2: { // a classe row é pra deixar aquele os items(Text e Image), alinhado um do lado do outro
        //assim n precisando fazer um milhão de margin pra alinhar certo
        display: "flex",
        flexDirection: "row",

        //estilização
        padding: 20,
        borderRadius: 15,
        top: 5,
        width: "100%",
        height: 315,//margin top


        //colocar sombras
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowSpread: 5,
        elevation: 25,
    },


    title: { // estilização do text
        fontSize: 24,
        color: '#F6B628',
        fontWeight: "bold",
        padding: 15,
        textAlign: 'center',

    },

    titleContainer: {
        flex: 1, // Ocupa todo o espaço disponível
        alignItems: 'center', // Alinha o texto centralizado
    },

    subtitle: { // estilização do subtext

        fontSize: 18,
        color: '#1A478A',
        fontWeight: "bold",
        textAlign: 'left',

    },

    subtitle2: { // estilização do subtext

        fontSize: 18,
        color: '#1A478A',
        fontWeight: "bold",
        textAlign: 'left',
        top: 10,

    },
    column: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        paddingHorizontal: 10,

    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        gap: 10,
        color: '#1A478A',
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
        alignItems: 'left',
        gap: 10,

    },
    botaoConf: {
        width: 250, // largura do botão quadrado
        height: 50, // altura do botão quadrado
        backgroundColor: '#1A478A', // cor de fundo do botão
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 25, // bordas arredondadas
        //colocar sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 5,
        marginBottom: 110,
    },

    botao: {
        width: 250, // largura do botão quadrado
        height: 50, // altura do botão quadrado
        backgroundColor: '#F6B628', // cor de fundo do botão
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 25, // bordas arredondadas
        //colocar sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 40,
        marginBottom: 5,
    },

    texto: {
        color: '#F6B628', // cor do texto
        fontSize: 18, // tamanho do texto
        fontWeight: 'bold', // negrito do texto
    },

    text: {
        color: '#1A478A', // cor do texto
        fontSize: 18, // tamanho do texto
        fontWeight: 'bold', // negrito do texto
    }

});