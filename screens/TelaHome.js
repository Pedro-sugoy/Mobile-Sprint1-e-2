import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/mottu_Logo.jpg")}
        style={styles.image} 
      />

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.text}>
        Um App para achar com mais facilidade as motos nos patios.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Desenvolvedores')}
      >
        <Text style={styles.buttonText}>Desenvolvedores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro de Moto')}
      >
        <Text style={styles.buttonText}>Cadastrar Moto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Mapa do Pátio')}
      >
        <Text style={styles.buttonText}>Mapa do Pátio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lista de Motos')}
      >
        <Text style={styles.buttonText}>Lista de Motos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: 'green',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  image: {
    width: 80, 
    height: 80,
    borderRadius: 40, 
    marginBottom: 15,
    alignSelf:"left",
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
