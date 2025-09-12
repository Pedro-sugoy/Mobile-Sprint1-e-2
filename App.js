import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from './src/context/ThemeContext';

import HomeScreen from './screens/TelaHome';
import DesenvolvedoresScreen from './screens/TelaDevs';
import CadastroMotoScreen from './screens/TelaFormMoto';
import MapaPatioScreen from './screens/TelaMapaPatio';
import ListaMotosScreen from './screens/TelaListaMotos';
import TelaCadastro from './screens/TelaCadas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // ThemeProvider precisa envolver o NavigationContainer
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Início">
          <Stack.Screen name="Início" component={HomeScreen} />
          <Stack.Screen name="Desenvolvedores" component={DesenvolvedoresScreen} />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="Cadastro de Moto" component={CadastroMotoScreen} />
          <Stack.Screen name="Mapa do Pátio" component={MapaPatioScreen} />
          <Stack.Screen name="Lista de Motos" component={ListaMotosScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
