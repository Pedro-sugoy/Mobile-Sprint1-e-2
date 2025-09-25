import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';

export default function MotoCard({ moto, onDelete, onUpdate }) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(moto.status);

  const getStatusText = (status) => {
    switch (status?.toUpperCase()) {
      case 'MANUTENCAO': return t('emManutencao');
      case 'DISPONIVEL': return t('disponivel');
      case 'INDISPONIVEL': return t('indisponivel');
      default: return t('statusDesconhecido');
    }
  };

  // DELETE MOTO
  const handleDeleteMoto = async () => {
    try {
      const response = await fetch(
        `https://mottufind-c.onrender.com/api/Moto/placa?placa=${moto.placa}`,
        { method: 'DELETE' }
      );
      if (response.status === 204) {
        Alert.alert(t('Sucesso'), t('motoApagada'));
        if (onDelete) onDelete();
      } else if (response.status === 404) {
        Alert.alert(t('Erro'), t('motoNaoEncontrada'));
      } else {
        throw new Error('Erro ao deletar moto');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(t('Erro'), t('erroRemoverMoto'));
    }
  };

  // UPDATE STATUS
  const handleUpdateStatus = async () => {
    try {
      const body = {
        placa: moto.placa,
        modelo: moto.modelo,
        marca: moto.marca,
        status: status.toUpperCase(), // Enum válido
        patioId: moto.patioId,
      };

      const response = await fetch(
        `https://mottufind-c.onrender.com/api/Moto/placa?placa=${moto.placa}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (response.status === 204) {
        Alert.alert(t('Sucesso'), t('statusAtualizado'));
        setEditMode(false);
        if (onUpdate) onUpdate();
      } else {
        const data = await response.json();
        console.error(data);
        Alert.alert(t('Erro'), t('erroAtualizarMoto'));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(t('Erro'), t('erroAtualizarMoto'));
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.texto}>{t('placa')}: {moto.placa}</Text>
      <Text style={styles.texto}>{t('marca')}: {moto.marca}</Text>
      <Text style={styles.texto}>{t('modelo')}: {moto.modelo}</Text>

      {editMode ? (
        <>
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label={t('emManutencao')} value="MANUTENCAO" />
            <Picker.Item label={t('disponivel')} value="DISPONIVEL" />
            <Picker.Item label={t('indisponivel')} value="INDISPONIVEL" />
          </Picker>

          <TouchableOpacity style={styles.buttonUpdate} onPress={handleUpdateStatus}>
            <Text style={styles.buttonText}>{t('atualizarStatus')}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.texto}>{t('status')}: {getStatusText(status)}</Text>
      )}

      <TouchableOpacity style={styles.buttonEdit} onPress={() => setEditMode(!editMode)}>
        <Text style={styles.buttonText}>{editMode ? t('cancelar') : t('editarStatus')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDeleteMoto}>
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
  picker: {
    backgroundColor: '#222',
    color: 'white',
    marginBottom: 10,
  },
  buttonEdit: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonUpdate: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
