import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import MotoCard from '../components/CardMoto'; 

export default function TelaListaMotos() {
  const [motos, setMotos] = useState([]);

  const carregarMotos = async () => {
    const motosSalvas = await AsyncStorage.getItem('motos');
    const lista = motosSalvas ? JSON.parse(motosSalvas) : [];
    setMotos(lista);
  };

  useFocusEffect(
    useCallback(() => {
      carregarMotos();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Motos 🛵</Text>
      <FlatList
        data={motos}
        keyExtractor={(item) => item.placa}
        renderItem={({ item }) => (
          <MotoCard
            modelo={item.modelo}
            placa={item.placa}
            status={item.status}
            onDelete={carregarMotos} 
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
});
