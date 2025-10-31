import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../src/context/ThemeContext';

export default function TelaCadastroMoto() {
  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [filialCidade, setFilialCidade] = useState('');
  const [filialPais, setFilialPais] = useState('');
  const [patioNome, setPatioNome] = useState('');

  const { t } = useTranslation();
  const { colors } = useTheme();

  function validarPlaca(placa) {
    const regex = /^[A-Za-z0-9]{7}$/;
    return regex.test(placa);
  }

  async function salvarMoto() {
    try {
      if (!placa || !status || !modelo || !marca || !filialCidade || !filialPais || !patioNome) {
        Alert.alert(t('Erro'), t('preenchaCampos'));
        return;
      }

      if (!validarPlaca(placa)) {
        Alert.alert(t('Erro'), t('placaInvalida'));
        return;
      }

      const filialResponse = await fetch("https://mottufind-c.onrender.com/api/Filial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cidade: filialCidade,
          pais: filialPais
        })
      });

      if (!filialResponse.ok) throw new Error("Erro ao criar filial");
      const filialData = await filialResponse.json();
      const filialId = filialData.id;

      const patioResponse = await fetch("https://mottufind-c.onrender.com/api/Patio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: patioNome,
          filialId: filialId
        })
      });

      if (!patioResponse.ok) throw new Error("Erro ao criar pátio");
      const patioData = await patioResponse.json();
      const patioId = patioData.id;

      const motoResponse = await fetch("https://mottufind-c.onrender.com/api/Moto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placa: placa.toUpperCase(),
          modelo: modelo.toUpperCase(),   
          marca: marca,
          status: status.toUpperCase(),   
          patioId: patioId
        })
      });

      if (!motoResponse.ok) throw new Error("Erro ao criar moto");

      // ✅ Mostra alerta normal
      Alert.alert(t('Sucesso'), t('motoCadastrada'));

      // ✅ Envia notificação push local
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🏍️ Moto criada com sucesso!",
          body: `Placa ${placa.toUpperCase()} foi cadastrada.`,
        },
        trigger: null, // dispara imediatamente
      });

      // Limpar campos
      setPlaca('');
      setStatus('');
      setModelo('');
      setMarca('');
      setFilialCidade('');
      setFilialPais('');
      setPatioNome('');

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t("Cadastrar Nova Moto")} 🏍️</Text>

      <TextInput
        placeholder={t("placeholderPlaca")}
        placeholderTextColor="gray"
        value={placa}
        onChangeText={setPlaca}
        style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
        maxLength={7}
        autoCapitalize="characters"
      />

      <Text style={[styles.label, { color: colors.text }]}>{t("Marca")}</Text>
      <TextInput
        placeholder={t("Digite a marca")}
        placeholderTextColor="gray"
        value={marca}
        onChangeText={setMarca}
        style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
      />

      <Text style={[styles.label, { color: colors.text }]}>{t("Cidade da Filial")}</Text>
      <TextInput
        placeholder={t("Digite a cidade")}
        placeholderTextColor="gray"
        value={filialCidade}
        onChangeText={setFilialCidade}
        style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
      />

      <Text style={[styles.label, { color: colors.text }]}>{t("País da Filial")}</Text>
      <TextInput
        placeholder={t("Digite o país")}
        placeholderTextColor="gray"
        value={filialPais}
        onChangeText={setFilialPais}
        style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
      />

      <Text style={[styles.label, { color: colors.text }]}>{t("Nome do Pátio")}</Text>
      <TextInput
        placeholder={t("Digite o nome do pátio")}
        placeholderTextColor="gray"
        value={patioNome}
        onChangeText={setPatioNome}
        style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
      />

      <Text style={[styles.label, { color: colors.text }]}>{t("Status")}</Text>
      <View style={[styles.pickerContainer, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={{ color: status ? colors.text : 'gray' }}
        >
          <Picker.Item label={t("Selecione um status")} value="" />
          <Picker.Item label={t("Manutenção")} value="MANUTENCAO" />
          <Picker.Item label={t("Disponível")} value="DISPONIVEL" />
          <Picker.Item label={t("Indisponível")} value="INDISPONIVEL" />
        </Picker>
      </View>

      <Text style={[styles.label, { color: colors.text }]}>{t("Modelo")}</Text>
      <View style={[styles.pickerContainer, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
        <Picker
          selectedValue={modelo}
          onValueChange={(itemValue) => setModelo(itemValue)}
          style={{ color: modelo ? colors.text : 'gray' }}
        >
          <Picker.Item label={t("Selecione um modelo")} value="" />
          <Picker.Item label={t("Moto Sport")} value="SPORT" />
          <Picker.Item label={t("Moto Pop")} value="POP" />
          <Picker.Item label={t("Moto Elétrica")} value="ELETRICA" />
        </Picker>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={salvarMoto}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("Salvar Moto")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, borderRadius: 8, padding: 15, marginBottom: 15, fontSize: 16 },
  pickerContainer: { borderWidth: 1, borderRadius: 8, marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  button: { borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 20 },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
});
