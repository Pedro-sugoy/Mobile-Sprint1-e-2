import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; 

export default function TelaCadastroMoto({ onMotoCadastrada }) {
  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState('');

  async function salvarMoto() {
    if (placa && status) {
      const novaMoto = { placa, status };
      const motosSalvas = await AsyncStorage.getItem('motos');
      const motos = motosSalvas ? JSON.parse(motosSalvas) : [];
      motos.push(novaMoto);
      await AsyncStorage.setItem('motos', JSON.stringify(motos));
      onMotoCadastrada(); 
      alert('Moto cadastrada com sucesso!');
      setPlaca('');
      setStatus('');
    } else {
      alert('Preencha todos os campos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Nova Moto🏍️</Text>

      <TextInput
        placeholder="Placa da Moto"
        value={placa}
        onChangeText={setPlaca}
        style={styles.input}
      />

      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Desligado" value="desligado" />
        <Picker.Item label="Manutenção" value="manutencao" />
        <Picker.Item label="Disponível" value="disponivel" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={salvarMoto}>
        <Text style={styles.buttonText}>Salvar Moto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: 'green',
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
  label: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
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
