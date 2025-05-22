import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardMoto from '../components/CardMoto';



export default function TelaListaMotos() {
  const [motos, setMotos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function carregarMotos() {
        const motosSalvas = await AsyncStorage.getItem('motos');
        const lista = motosSalvas ? JSON.parse(motosSalvas) : [];
        console.log('Motos carregadas do AsyncStorage:', lista);
        setMotos(lista);
      }
      carregarMotos();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Motos🛵</Text>
      <FlatList
        data={motos}
        keyExtractor={(item) => item.placa}
        renderItem={({ item }) => (
        <View>
          <CardMoto modelo={item.modelo} placa={item.placa} zona={item.zona} />
        </View>
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
