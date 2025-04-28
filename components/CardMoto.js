import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MotoCard({ modelo, placa, zona }) {
  return (
    <View style={styles.card}>
      <Text style={styles.modelo}>Modelo: {modelo}</Text>
      <Text style={styles.texto}>Placa: {placa}</Text>
      <Text style={styles.texto}>Zona: {zona}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  modelo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  texto: {
    fontSize: 16,
  },
});
