import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function MotoCard({ placa, modelo, status, onDelete }) {
  const { t } = useTranslation();

  const getStatusText = (status) => {
    switch (status) {
      case 'ligado':
        return t('ligado');
      case 'desligado':
        return t('desligado');
      case 'manutencao':
        return t('emManutencao');
      case 'disponivel':
        return t('disponivel');
      default:
        return t('statusDesconhecido');
    }
  };

  const getModeloText = (modelo) => {
    switch (modelo) {
      case 'moto_sport':
        return t('motoSport');
      case 'moto_e':
        return t('motoE');
      case 'moto_pop':
        return t('motoPop');
      default:
        return t('modeloDesconhecido');
    }
  };

  const handleDelete = async () => {
    try {
      const storedMotos = await AsyncStorage.getItem('motos');
      let motos = storedMotos ? JSON.parse(storedMotos) : [];

      motos = motos.filter((moto) => moto.placa !== placa);
      await AsyncStorage.setItem('motos', JSON.stringify(motos));

      if (onDelete) onDelete(); 
    } catch (error) {
      Alert.alert(t('erro'), t('erroRemoverMoto'));
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.texto}>{t('placa')}: {placa}</Text>
      <Text style={styles.texto}>{t('status')}: {getStatusText(status)}</Text>
      <Text style={styles.texto}>{t('modelo')}: {getModeloText(modelo)}</Text>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>{t('apagarMoto')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#fff',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  texto: {
    fontSize: 16,
    marginBottom: 5,
    color: 'green',
  },
  buttonDelete: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
