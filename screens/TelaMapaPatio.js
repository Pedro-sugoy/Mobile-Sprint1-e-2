import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

export default function TelaMapaPatio() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mapa do Pátio</Text>
      <Text style={styles.text}>Simulação visual da organização das motos no pátio.</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/300x200.png?text=Mapa+do+Pátio' }}
        style={styles.image}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 80,  
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
