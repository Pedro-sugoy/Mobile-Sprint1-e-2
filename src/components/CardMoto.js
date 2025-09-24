import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

export default function MotoCard({ moto, onDelete, onUpdate }) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(moto.status);
  const [marca, setMarca] = useState(moto.marca);

  const getStatusText = (status) => {
    switch (status.toUpperCase()) {
      case 'LIGADO': return t('ligado');
      case 'DESLIGADO': return t('desligado');
      case 'MANUTENCAO': return t('emManutencao');
      case 'DISPONIVEL': return t('disponivel');
      default: return t('statusDesconhecido');
    }
  };

  const handleDelete = async () => {
    try {
      const responseMoto = await fetch(`https://mottufind-c.onrender.com/api/Moto/placa?placa=${moto.placa}`, { method: 'DELETE' });
      if (responseMoto.status !== 204) throw new Error('Erro ao deletar moto');

      let filialId = null;
      if (moto.patioId) {
        const responsePatioGet = await fetch(`https://mottufind-c.onrender.com/api/Patio/${moto.patioId}`);
        if (responsePatioGet.ok) {
          const patioData = await responsePatioGet.json();
          filialId = patioData.data.filialId;

          const responsePatio = await fetch(`https://mottufind-c.onrender.com/api/Patio/${moto.patioId}`, { method: 'DELETE' });
          if (responsePatio.status !== 204) throw new Error('Erro ao deletar pátio');
        }
      }

      if (filialId) {
        const responseFilial = await fetch(`https://mottufind-c.onrender.com/api/Filial/${filialId}`, { method: 'DELETE' });
        if (responseFilial.status !== 204) throw new Error('Erro ao deletar filial');
      }

      Alert.alert(t('Sucesso'), t('motoPatioFilialApagados'));
      if (onDelete) onDelete();
    } catch (error) {
      console.error(error);
      Alert.alert(t('Erro'), error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const validStatus = ['LIGADO', 'DESLIGADO', 'MANUTENCAO', 'DISPONIVEL'];
      if (!validStatus.includes(status.toUpperCase())) {
        Alert.alert(t('Erro'), t('statusInvalido'));
        return;
      }

      if (marca === moto.marca && status === moto.status) {
        Alert.alert(t('Info'), t('nenhumaAlteracao'));
        setEditMode(false);
        return;
      }

      const updateBody = {
        placa: moto.placa,
        modelo: moto.modelo, // modelo fixo
        marca: marca,
        status: status.toUpperCase(),
        patioId: moto.patioId
      };

      const response = await fetch(`https://mottufind-c.onrender.com/api/Moto/placa?placa=${moto.placa}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateBody),
      });

      if (response.status !== 204) throw new Error('Erro ao atualizar moto');

      Alert.alert(t('Sucesso'), t('motoAtualizada'));
      setEditMode(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error(error);
      Alert.alert(t('Erro'), t('erroAtualizarMoto'));
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.texto}>{t('placa')}: {moto.placa}</Text>
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            value={marca}
            onChangeText={setMarca}
            placeholder={t('marca')}
          />

          <Text style={styles.label}>{t('status')}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={(val) => setStatus(val)}
              style={{ color: 'white' }}
            >
              <Picker.Item label={t("Selecione um status")} value="" />
              <Picker.Item label={t("Ligado")} value="LIGADO" />
              <Picker.Item label={t("Desligado")} value="DESLIGADO" />
              <Picker.Item label={t("Manutenção")} value="MANUTENCAO" />
              <Picker.Item label={t("Disponível")} value="DISPONIVEL" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.buttonUpdate} onPress={handleUpdate}>
            <Text style={styles.buttonText}>{t('atualizarMoto')}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.texto}>{t('marca')}: {marca}</Text>
          <Text style={styles.texto}>{t('modelo')}: {moto.modelo}</Text>
          <Text style={styles.texto}>{t('status')}: {getStatusText(status)}</Text>
        </>
      )}

      <TouchableOpacity style={styles.buttonEdit} onPress={() => setEditMode(!editMode)}>
        <Text style={styles.buttonText}>{editMode ? t('cancelar') : t('editarMoto')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>{t('apagarMoto')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  texto: { fontSize: 16, marginBottom: 5, color: 'white' },
  input: { borderWidth: 1, borderRadius: 8, borderColor: 'gray', padding: 10, marginBottom: 5, color: 'white' },
  pickerContainer: { borderWidth: 1, borderRadius: 8, borderColor: 'gray', marginBottom: 10 },
  buttonEdit: { backgroundColor: '#1E90FF', paddingVertical: 10, borderRadius: 8, marginTop: 5, alignItems: 'center' },
  buttonUpdate: { backgroundColor: '#32CD32', paddingVertical: 10, borderRadius: 8, marginTop: 5, alignItems: 'center' },
  buttonDelete: { backgroundColor: '#FF6347', paddingVertical: 10, borderRadius: 8, marginTop: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  label: { color: 'white', marginBottom: 5 },
});
