// TelaLogin.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../src/context/ThemeContext';
import { auth } from '../src/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (!email.endsWith("@mottu.com.br")) {
      Alert.alert("Erro", "Email inválido! Use um email @mottu.com.br");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), senha);
      console.log('Usuário logado:', userCredential.user.uid);

      Alert.alert("Sucesso", t("Login realizado com sucesso!"));

      // Redireciona para TelaHome e limpa histórico de navegação
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });

    } catch (error) {
      console.log(error.code, error.message);

      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert("Erro", "Usuário não encontrado!");
          break;
        case 'auth/wrong-password':
          Alert.alert("Erro", "Senha incorreta!");
          break;
        case 'auth/invalid-email':
          Alert.alert("Erro", "Email inválido!");
          break;
        default:
          Alert.alert("Erro", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t("Login")} 🔐</Text>

      <View style={styles.formContainer}>
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

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button, opacity: loading ? 0.7 : 1 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("Entrar")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button }]}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("Criar Conta")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textTransform: 'uppercase' },
  formContainer: { borderRadius: 10, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 6, width: '100%', maxWidth: 400 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  button: { borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 10 },
  buttonText: { fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase' },
});
