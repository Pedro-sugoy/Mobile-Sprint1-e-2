import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

export default function TelaMapaPatio() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mapa do Pátio</Text>
      <Text style={styles.text}>Simulação visual da organização das motos no pátio.</Text>
      <Image
        source={require('../assets/patio.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Organização das motos no pátio.</Text>
      <Image
        source={require('../assets/patioIdeia.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 400,  
    height: 200
  },
});
