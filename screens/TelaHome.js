import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../src/services/i18n';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();

  // Alterna entre PT e ES
  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'es' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      {/* Botão no topo para trocar idioma */}
      <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
        <Text style={styles.langButtonText}>
          🌐 {i18n.language.toUpperCase()}
        </Text>
      </TouchableOpacity>

      <Image 
        source={require("../assets/mottu_Logo.jpg")}
        style={styles.image} 
      />

      <Text style={styles.title}>{t("Bem-vindo!")}</Text>
      <Text style={styles.text}>
        {t("Um App para achar com mais facilidade as motos nos pátios.")}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Desenvolvedores')}
      >
        <Text style={styles.buttonText}>{t("Desenvolvedores")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>{t("Cadastro")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro de Moto')}
      >
        <Text style={styles.buttonText}>{t("Cadastrar Moto")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Mapa do Pátio')}
      >
        <Text style={styles.buttonText}>{t("Mapa do Pátio")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lista de Motos')}
      >
        <Text style={styles.buttonText}>{t("Lista de Motos")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  langButton: {
    position: 'absolute',
    top: 40,
    right: 20,
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
    color: 'green',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: 'green',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  image: {
    width: 80, 
    height: 80,
    borderRadius: 40, 
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
