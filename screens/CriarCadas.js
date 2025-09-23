// Cadastro.js
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../src/firebase/firebaseConfig' // ajuste conforme o seu caminho real
import { useTheme } from '../src/context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

export default function Cadastro() {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const navigation = useNavigation() // sem <any>, compatível com JS

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCadastro = async () => {
    if (!nome.trim() || !email.trim() || !senha) {
      Alert.alert(t('Erro'), t('Preencha todos os campos!'))
      return
    }

    if (!email.endsWith('@mottu.com.br')) {
      Alert.alert(t('Erro'), t('Email inválido! Use um email @mottu.com.br'))
      return
    }

    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), senha)
      await updateProfile(userCredential.user, { displayName: nome.trim() })

      Alert.alert(t('Sucesso'), t('Cadastro realizado com sucesso!'))

      // Redireciona para Login sem RESET (evita warning)
      navigation.navigate('Login')
    } catch (error) {
      console.log(error.code, error.message)
      Alert.alert(t('Erro'), error.message)
    } finally {
      setLoading(false)
    }
  }

  const s = makeStyles(colors)

  return (
    <View style={s.container}>
      <Text style={s.title}>{t('Criar Cadastro')}</Text>

      <View style={s.inputWrap}>
        <Feather name="user" size={18} color={colors.primary} />
        <TextInput
          placeholder={t('Nome')}
          value={nome}
          onChangeText={setNome}
          style={s.input}
          placeholderTextColor={colors.text + '99'}
        />
      </View>

      <View style={s.inputWrap}>
        <Feather name="mail" size={18} color={colors.primary} />
        <TextInput
          placeholder={t('Email')}
          value={email}
          onChangeText={setEmail}
          style={s.input}
          placeholderTextColor={colors.text + '99'}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={s.inputWrap}>
        <MaterialCommunityIcons name="lock-outline" size={18} color={colors.primary} />
        <TextInput
          placeholder={t('Senha')}
          value={senha}
          onChangeText={setSenha}
          style={s.input}
          placeholderTextColor={colors.text + '99'}
          secureTextEntry={!showSenha}
        />
        <TouchableOpacity onPress={() => setShowSenha(v => !v)} style={s.iconBtn}>
          <Feather name={showSenha ? 'eye' : 'eye-off'} size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[s.button, loading && { opacity: 0.7 }]}
        onPress={handleCadastro}
        disabled={loading}
      >
        <Feather name="user-check" size={18} color={colors.bg} />
        <Text style={s.buttonTxt}>{loading ? t('Cadastrando...') : t('Cadastrar')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={s.linkRow}>
        <Feather name="log-in" size={16} color={colors.primary} />
        <Text style={s.link}>{t('Já possui uma conta? Entrar')}</Text>
      </TouchableOpacity>
    </View>
  )
}

function makeStyles(colors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 16, paddingBottom: 16, justifyContent: 'center' },
    title: { color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 20 },
    inputWrap: { height: 48, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg, borderRadius: 10, borderWidth: 1, borderColor: colors.card, paddingHorizontal: 12, gap: 8, marginBottom: 10 },
    input: { flex: 1, color: colors.text },
    iconBtn: { padding: 4 },
    button: { height: 48, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 10 },
    buttonTxt: { color: colors.bg, fontWeight: '700' },
    linkRow: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'center', marginTop: 12 },
    link: { color: colors.primary, fontWeight: '700' }
  })
}
