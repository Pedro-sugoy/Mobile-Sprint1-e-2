import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MotoCard from '../components/CardMoto';

export default function TelaListaMotos() {
  const [motos, setMotos] = useState([]);

  useEffect(() => {
    async function carregarMotos() {
      const motosSalvas = await AsyncStorage.getItem('motos');
      if (motosSalvas) {
        setMotos(JSON.parse(motosSalvas));
      }
    }
    
    carregarMotos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Motos🛵</Text>
      <FlatList
        data={motos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MotoCard modelo={item.modelo} placa={item.placa} zona={item.zona} />
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
  card:{
    backgroundColor:'black',
    color:'black'
  }
});
