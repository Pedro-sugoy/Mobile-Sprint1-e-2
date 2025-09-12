import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../src/context/ThemeContext';

export default function TelaCadastroMoto() {
  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState('');
  const [modelo, setModelo] = useState('');

  const { t } = useTranslation();
  const { colors } = useTheme(); 

  function validarPlaca(placa) {
    const regex = /^[A-Za-z0-9]{7}$/;
    return regex.test(placa);
  }

  async function salvarMoto() {
    if (!placa || !status || !modelo) {
      Alert.alert(t('Erro'), t('preenchaCampos'));
      return;
    }

    if (!validarPlaca(placa)) {
      Alert.alert(t('Erro'), t('placaInvalida'));
      return;
    }

    const novaMoto = { placa, status, modelo };
    const motosSalvas = await AsyncStorage.getItem('motos');
    const motos = motosSalvas ? JSON.parse(motosSalvas) : [];
    motos.push(novaMoto);
    await AsyncStorage.setItem('motos', JSON.stringify(motos));
    Alert.alert(t('Sucesso'), t('motoCadastrada'));
    setPlaca('');
    setStatus('');
    setModelo('');
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t("Cadastrar Nova Moto")}🏍️</Text>

      <TextInput
        placeholder={t("placeholderPlaca")}
        placeholderTextColor={"gray"}
        value={placa}
        onChangeText={setPlaca}
        style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
        maxLength={7}
        autoCapitalize="characters"
      />

      <Text style={[styles.label, { color: colors.text }]}>{t("Status")}</Text>
      <View style={[styles.pickerContainer, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={{ color: status ? colors.text : 'gray' }}
        >
          <Picker.Item label={t("Selecione um status")} value="" />
          <Picker.Item label={t("Ligado")} value="ligado" />
          <Picker.Item label={t("Desligado")} value="desligado" />
          <Picker.Item label={t("Manutenção")} value="manutencao" />
          <Picker.Item label={t("Disponível")} value="disponivel" />
        </Picker>
      </View>

      <Text style={[styles.label, { color: colors.text }]}>{t("Modelo")}</Text>
      <View style={[styles.pickerContainer, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
        <Picker
          selectedValue={modelo}
          onValueChange={(itemValue) => setModelo(itemValue)}
          style={{ color: status ? colors.text : 'gray' }}
        >
          <Picker.Item label={t("Selecione um modelo")} value="" />
          <Picker.Item label={t("Moto Sport")} value="moto_sport" />
          <Picker.Item label={t("Moto E")} value="moto_e" />
          <Picker.Item label={t("Moto Pop")} value="moto_pop" />
        </Picker>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={salvarMoto}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("Salvar Moto")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
