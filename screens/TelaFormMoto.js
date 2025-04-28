import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaCadastroMoto({ navigation }) {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [zona, setZona] = useState('');

  async function salvarMoto() {
    if (modelo && placa && zona) {
      const novaMoto = { modelo, placa, zona };
      const motosSalvas = await AsyncStorage.getItem('motos');
      const motos = motosSalvas ? JSON.parse(motosSalvas) : [];
      motos.push(novaMoto);
      await AsyncStorage.setItem('motos', JSON.stringify(motos));
      alert('Moto cadastrada com sucesso!');
      setModelo('');
      setPlaca('');
      setZona('');
    } else {
      alert('Preencha todos os campos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Nova Moto🏍️</Text>

      <TextInput
        placeholder="Modelo da Moto"
        value={modelo}
        onChangeText={setModelo}
        style={styles.input}
      />
      <TextInput
        placeholder="Placa da Moto"
        value={placa}
        onChangeText={setPlaca}
        style={styles.input}
      />
      <TextInput
        placeholder="Zona no Pátio"
        value={zona}
        onChangeText={setZona}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={salvarMoto}>
        <Text style={styles.buttonText}>Salvar Moto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
