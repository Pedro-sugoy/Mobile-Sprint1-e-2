import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MotoCard({ placa, modelo, status, onDelete }) {
  const getStatusText = (status) => {
    switch (status) {
      case 'ligado':
        return 'Ligado';
      case 'desligado':
        return 'Desligado';
      case 'manutencao':
        return 'Em Manutenção';
      case 'disponivel':
        return 'Disponível';
      default:
        return 'Status Desconhecido';
    }
  };

  const getModeloText = (modelo) => {
    switch (modelo) {
      case 'moto_sport':
        return 'Moto Sport';
      case 'moto_e':
        return 'Moto E';
      case 'moto_pop':
        return 'Moto Pop';
      default:
        return 'Modelo Desconhecido';
    }
  };

  const handleDelete = async () => {
    try {
      const storedMotos = await AsyncStorage.getItem('motos');
      let motos = storedMotos ? JSON.parse(storedMotos) : [];

      motos = motos.filter((moto) => moto.placa !== placa);
      await AsyncStorage.setItem('motos', JSON.stringify(motos));

      if (onDelete) onDelete(); 
    } catch (error) {
      Alert.alert('Erro', 'Erro ao remover a moto.');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.texto}>Placa: {placa}</Text>
      <Text style={styles.texto}>Status: {getStatusText(status)}</Text>
      <Text style={styles.texto}>Modelo: {getModeloText(modelo)}</Text>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>Apagar Moto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#fff',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  texto: {
    fontSize: 16,
    marginBottom: 5,
    color: 'green',
  },
  buttonDelete: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


