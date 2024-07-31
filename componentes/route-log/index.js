import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '../../pages/log/welcome';
import Login from '../../pages/log/login';
import Cadastro from '../../pages/log/cadastro';

import  RouterMotor from '../router-Motor/index';
import RouterUser from '../router-User/index';



const Stack = createNativeStackNavigator();

export default function RouteLog(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Welcome" 
                component={Welcome} 
                options={{ headerShown: false }}
                />
                <Stack.Screen name="Login" component={Login}
                options={{
                    title: ''
                }}
                />
                <Stack.Screen name="Cadastro" component={Cadastro}
                 options={{
                    title: ''
                }}
                />
                <Stack.Screen name="RouterMotor" component={RouterMotor} 
                options={{ headerShown: false }}
                />
                <Stack.Screen name="RouterUser" component={RouterUser}  
                options={{ headerShown: false }}
                />

              
            </Stack.Navigator>
        </NavigationContainer>
    );
}