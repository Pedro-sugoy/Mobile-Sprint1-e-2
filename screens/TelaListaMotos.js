import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MotoCard from '../src/components/CardMoto';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../src/context/ThemeContext';

export default function TelaListaMotos() {
  const [motos, setMotos] = useState([]);
  const { t } = useTranslation();
  const { colors } = useTheme();

  const carregarMotos = async () => {
    try {
      const response = await fetch('https://mottufind-c.onrender.com/api/Moto');
      if (!response.ok) throw new Error('Erro ao buscar motos');
      const data = await response.json();
      setMotos(data);
    } catch (error) {
      console.error(error);
      Alert.alert(t('Erro'), t('erroCarregarMotos'));
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarMotos();
    }, [])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t("Lista de Motos")}🛵</Text>
      <FlatList
        data={motos}
        keyExtractor={(item) => item.placa} // corrigido: placa é única
        renderItem={({ item }) => (
          <MotoCard
            moto={item}
            onDelete={carregarMotos}
            onUpdate={carregarMotos}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
});
