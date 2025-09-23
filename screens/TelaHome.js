import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../src/services/i18n';
import { useTheme } from '../src/context/ThemeContext';
import ThemeToggleButton from '../src/components/ThemeToggleButton';
import { auth } from '../src/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'es' : 'pt';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      console.log("Erro ao deslogar:", error);
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Botões do topo */}
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪</Text>
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
            <Text style={styles.langButtonText}>
              🌐 {i18n.language.toUpperCase()}
            </Text>
          </TouchableOpacity>

          <ThemeToggleButton />
        </View>
      </View>

      <Image 
        source={require("../assets/mottu_Logo.png")}
        style={styles.image} 
      />

      <Text style={[styles.title, { color: colors.text }]}>{t("Bem-vindo!")}</Text>
      <Text style={[styles.text, { color: colors.text }]}>
        {t("Um App para achar com mais facilidade as motos nos pátios.")}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() => navigation.navigate('Desenvolvedores')}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("Desenvolvedores")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("Cadastro")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() => navigation.navigate('Cadastro de Moto')}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("Cadastrar Moto")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() => navigation.navigate('Mapa do Pátio')}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("Mapa do Pátio")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() => navigation.navigate('Lista de Motos')}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t("Lista de Motos")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  topContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF5555',
    padding: 6,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  langButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  langButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 80, 
    height: 80,
    borderRadius: 40, 
    marginBottom: 15,
    alignSelf: "flex-start",
  },
});
