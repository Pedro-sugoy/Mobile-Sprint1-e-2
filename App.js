import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';

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
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    // Listener para receber notificações quando o app estiver aberto
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida:', notification);
    });

    return () => subscription.remove();
  }, []);

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

// 📱 Função auxiliar para registrar notificações
async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert('Use um dispositivo físico para testar notificações.');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Permissão negada para notificações.');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}
