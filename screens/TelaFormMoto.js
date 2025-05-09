import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function TelaCadastroMoto({ onMotoCadastrada }) {
  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState('');
  const [modelo, setModelo] = useState('');

  function validarPlaca(placa) {
    const regex = /^[A-Za-z0-9]{7}$/;
    return regex.test(placa);
  }

  async function salvarMoto() {
    if (!placa || !status || !modelo) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (!validarPlaca(placa)) {
      Alert.alert('Erro', 'A placa deve conter exatamente 7 caracteres alfanuméricos.');
      return;
    }

    const novaMoto = { placa, status, modelo };
    const motosSalvas = await AsyncStorage.getItem('motos');
    const motos = motosSalvas ? JSON.parse(motosSalvas) : [];
    motos.push(novaMoto);
    await AsyncStorage.setItem('motos', JSON.stringify(motos));
    onMotoCadastrada();
    Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');
    setPlaca('');
    setStatus('');
    setModelo('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Nova Moto🏍️</Text>

      <TextInput
        placeholder="Placa da Moto (7 caracteres)"
        value={placa}
        onChangeText={setPlaca}
        style={styles.input}
        maxLength={7}
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione um status" value="" />
        <Picker.Item label="Ligado" value="ligado" />
        <Picker.Item label="Desligado" value="desligado" />
        <Picker.Item label="Manutenção" value="manutencao" />
        <Picker.Item label="Disponível" value="disponivel" />
      </Picker>

      <Text style={styles.label}>Modelo</Text>
      <Picker
        selectedValue={modelo}
        onValueChange={(itemValue) => setModelo(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione um modelo" value="" />
        <Picker.Item label="Moto Sport" value="moto_sport" />
        <Picker.Item label="Moto E" value="moto_e" />
        <Picker.Item label="Moto Pop" value="moto_pop" />
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
