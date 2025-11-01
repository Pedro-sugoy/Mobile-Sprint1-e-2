import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from './src/context/ThemeContext';

import HomeScreen from './screens/TelaHome';
import DesenvolvedoresScreen from './screens/TelaDevs';
import CadastroMotoScreen from './screens/TelaFormMoto';
import MapaPatioScreen from './screens/TelaMapaPatio';
import ListaMotosScreen from './screens/TelaListaMotos';
import TelaLogin from './screens/TelaLogin';
import CriarCadas from './screens/CriarCadas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }} 
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Desenvolvedores" component={DesenvolvedoresScreen} />
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="Cadastro de Moto" component={CadastroMotoScreen} />
          <Stack.Screen name="Mapa do Pátio" component={MapaPatioScreen} />
          <Stack.Screen name="Lista de Motos" component={ListaMotosScreen} />
          <Stack.Screen name="Criar Cadastro" component={CriarCadas} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
