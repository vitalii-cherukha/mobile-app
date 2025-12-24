import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useWeapons } from '@/contexts/WeaponContext';
import { Weapon } from '@/types/weapon';

interface AddWeaponModalProps {
  visible: boolean;
  onClose: () => void;
  editWeapon?: Weapon | null;
}

export const AddWeaponModal: React.FC<AddWeaponModalProps> = ({ visible, onClose, editWeapon }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [model, setModel] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { addWeapon, updateWeapon } = useWeapons();

  useEffect(() => {
    if (editWeapon) {
      setSerialNumber(editWeapon.serialNumber);
      setModel(editWeapon.model);
      setFirstName(editWeapon.firstName);
      setLastName(editWeapon.lastName);
    } else {
      setSerialNumber('');
      setModel('');
      setFirstName('');
      setLastName('');
    }
  }, [editWeapon, visible]);

  const handleSubmit = () => {
    if (!serialNumber.trim() || !model.trim() || !firstName.trim() || !lastName.trim()) {
      Alert.alert('Помилка', 'Заповніть всі поля');
      return;
    }

    const weaponData = {
      serialNumber: serialNumber.trim(),
      model: model.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      status: 'available' as 'available' | 'issued',
    };

    if (editWeapon) {
      updateWeapon(editWeapon.id, weaponData);
      Alert.alert('Успіх', 'Зброю оновлено');
    } else {
      addWeapon(weaponData);
      Alert.alert('Успіх', 'Зброю додано до списку');
    }

    setSerialNumber('');
    setModel('');
    setFirstName('');
    setLastName('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <ThemedText style={[styles.title, { color: '#333' }]}>
            {editWeapon ? 'Редагувати зброю' : 'Додати зброю'}
          </ThemedText>
          
          <TextInput
            style={styles.input}
            placeholder="Номер зброї"
            placeholderTextColor="#999"
            value={serialNumber}
            onChangeText={setSerialNumber}
            autoCapitalize="characters"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Модель зброї"
            placeholderTextColor="#999"
            value={model}
            onChangeText={setModel}
            autoCapitalize="words"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Ім'я"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Прізвище"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
          
          <ThemedView style={styles.buttons}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <ThemedText style={styles.cancelButtonText}>Скасувати</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]} 
              onPress={handleSubmit}
            >
              <ThemedText style={styles.submitButtonText}>
              {editWeapon ? 'Оновити' : 'Додати'}
            </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    padding: 20,
    borderRadius: 12,
    gap: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: '#ccc',
    color: '#333',
    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#666666',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});