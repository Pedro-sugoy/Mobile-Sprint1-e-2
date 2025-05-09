import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaMotos() {
  const [motos, setMotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMotos() {
      const motosSalvas = await AsyncStorage.getItem('motos');
      let motosList = motosSalvas ? JSON.parse(motosSalvas) : [];

      motosList = motosList.filter((value, index, self) =>
        index === self.findIndex((t) => t.placa === value.placa)
      );

      setMotos(motosList);
      setIsLoading(false);
    }
    loadMotos();
  }, []);

  const handleDelete = async (placaToDelete) => {
    const updatedMotos = motos.filter(moto => moto.placa !== placaToDelete);
    await AsyncStorage.setItem('motos', JSON.stringify(updatedMotos));
    setMotos(updatedMotos);
    alert('Moto removida com sucesso!');
  };

  const renderMoto = ({ item }) => {
    let statusText;

    switch (item.status) {
      case 'ligado':
        statusText = 'Ligado';
        break;
      case 'desligado':
        statusText = 'Desligado';
        break;
      case 'manutencao':
        statusText = 'Em Manutenção';
        break;
      case 'disponivel':
        statusText = 'Disponível';
        break;
      default:
        statusText = 'Status Desconhecido';
    }

    let modeloFormatado = '';
    switch (item.modelo) {
      case 'moto_sport':
        modeloFormatado = 'Moto Sport';
        break;
      case 'moto_e':
        modeloFormatado = 'Moto E';
        break;
      case 'moto_pop':
        modeloFormatado = 'Moto Pop';
        break;
      default:
        modeloFormatado = 'Modelo Desconhecido';
    }

    return (
      <View style={styles.card}>
        <Text style={styles.texto}>Placa: {item.placa}</Text>
        <Text style={styles.texto}>Status: {statusText}</Text>
        <Text style={styles.texto}>Modelo: {modeloFormatado}</Text>

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => handleDelete(item.placa)}
        >
          <Text style={styles.buttonText}>Apagar Moto</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) {
    return <Text style={styles.loadingText}>Carregando motos...</Text>;
  }

  return (
    <View style={styles.container}>
      {motos.length === 0 ? (
        <Text style={styles.noMotosText}>Nenhuma moto cadastrada.</Text>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.placa}
          renderItem={renderMoto}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'flex-start',
  },
  list: {
    marginTop: 30,
  },
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
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  noMotosText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
});
