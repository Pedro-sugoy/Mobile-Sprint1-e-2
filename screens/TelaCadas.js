import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../src/context/ThemeContext';

export default function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [setor, setSetor] = useState('');

  const { t } = useTranslation();
  const { colors } = useTheme(); 

  const handleCadastro = () => {
    console.log({ nome, email, senha, setor });
    alert(t("Cadastro realizado com sucesso!"));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t("Cadastro")} 📝</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, { borderColor: colors.text, color: colors.text }]}
          placeholder={t("Nome")}
          placeholderTextColor="gray"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.text, color: colors.text }]}
          placeholder={t("Email")}
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.text, color: colors.text }]}
          placeholder={t("Senha")}
          placeholderTextColor="gray"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.text, color: colors.text }]}
          placeholder={t("Setor")}
          placeholderTextColor="gray"
          value={setor}
          onChangeText={setSetor}
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }] } onPress={handleCadastro}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("ENTRAR")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  formContainer: {
    borderRadius: 10,
    padding: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    width: '100%',
    maxWidth: 400,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});
