import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../src/context/ThemeContext';

export default function TelaDesenvolvedores() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t("DESENVOLVEDORES")}👨‍💻</Text>

      <View style={[styles.developerContainer, { backgroundColor: colors.background }]}>
        <Image 
          source={require('../assets/pedro.jpg')} 
          style={styles.image}
        />
        <Text style={[styles.text, { color: colors.text }]}>
          {t("Nome")}: Pedro Manzo Yokoo - RM556115
        </Text>
      </View>

      <View style={[styles.developerContainer, { backgroundColor: colors.background }]}>
        <Image 
          source={require('../assets/fernando.jpg')}
          style={styles.image}
        />
        <Text style={[styles.text, { color: colors.text }]}>
          {t("Nome")}: Fernando Fernandes Prado - RM557982
        </Text>
      </View>

      <View style={[styles.developerContainer, { backgroundColor: colors.background }]}>
        <Image 
          source={require('../assets/guilherme.jpg')}
          style={styles.image}
        />
        <Text style={[styles.text, { color: colors.text }]}>
          {t("Nome")}: Guilherme Camasmie Laiber de Jesus - RM554894
        </Text>
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
  developerContainer: {
    borderRadius: 10,
    padding: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  image: {
    width: 80, 
    height: 80,
    borderRadius: 40, 
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
    fontFamily: 'Roboto',
  },
});
