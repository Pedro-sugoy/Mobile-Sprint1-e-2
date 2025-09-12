import React, { useTransition } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function TelaMapaPatio() {

  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("Mapa do Pátio")}</Text>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 400,  
    height: 200
  },
});
