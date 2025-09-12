import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

export default function TelaCadastroMoto() {
  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState('');
  const [modelo, setModelo] = useState('');

  const {t} = useTranslation();

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
    //console.log(motos)
    await AsyncStorage.setItem('motos', JSON.stringify(motos));
    onMotoCadastrada();
    Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');
    setPlaca('');
    setStatus('');
    setModelo('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("Cadastrar Nova Moto")}🏍️</Text>

      <TextInput
        placeholder={t("placeholderPlaca")}
        value={placa}
        onChangeText={setPlaca}
        style={styles.input}
        maxLength={7}
        autoCapitalize="characters"
      />


      <Text style={styles.label}>{t("status")}</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.input}
      >
        <Picker.Item label={t("selecione Status")} value="" />
        <Picker.Item label={t("ligado")} value="ligado" />
        <Picker.Item label={t("desligado")} value="desligado" />
        <Picker.Item label={t("manutencao")} value="manutencao" />
        <Picker.Item label={t("disponivel")} value="disponivel" />
      </Picker>


      <Text style={styles.label}>{t("modelo")}</Text>
      <Picker
        selectedValue={modelo}
        onValueChange={(itemValue) => setModelo(itemValue)}
        style={styles.input}
      >
        <Picker.Item label={t("selecioneModelo")} value="" />
        <Picker.Item label={t("motoSport")} value="moto_sport" />
        <Picker.Item label={t("motoE")} value="moto_e" />
        <Picker.Item label={t("motoPop")} value="moto_pop" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={salvarMoto}>
        <Text style={styles.buttonText}>{t("salvarMoto")}</Text>
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
