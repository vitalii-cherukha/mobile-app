import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useWeapons } from '@/contexts/WeaponContext';

interface AddWeaponModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddWeaponModal: React.FC<AddWeaponModalProps> = ({ visible, onClose }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [model, setModel] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { addWeapon } = useWeapons();
  const colorScheme = 'dark';

  const handleSubmit = () => {
    if (!serialNumber.trim() || !model.trim() || !firstName.trim() || !lastName.trim()) {
      Alert.alert('Помилка', 'Заповніть всі поля');
      return;
    }

    addWeapon({
      serialNumber: serialNumber.trim(),
      model: model.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    setSerialNumber('');
    setModel('');
    setFirstName('');
    setLastName('');
    onClose();
    Alert.alert('Успіх', 'Зброю додано до списку');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <ThemedText style={[styles.title, { color: '#333' }]}>Додати зброю</ThemedText>
          
          <TextInput
            style={[styles.input, { 
              borderColor: '#ccc',
              color: '#333',
              backgroundColor: 'white'
            }]}
            placeholder="Номер зброї"
            placeholderTextColor="#999"
            value={serialNumber}
            onChangeText={setSerialNumber}
          />
          
          <TextInput
            style={[styles.input, { 
              borderColor: '#ccc',
              color: '#333',
              backgroundColor: 'white'
            }]}
            placeholder="Модель зброї"
            placeholderTextColor="#999"
            value={model}
            onChangeText={setModel}
          />
          
          <TextInput
            style={[styles.input, { 
              borderColor: '#ccc',
              color: '#333',
              backgroundColor: 'white'
            }]}
            placeholder="Ім'я"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
          />
          
          <TextInput
            style={[styles.input, { 
              borderColor: '#ccc',
              color: '#333',
              backgroundColor: 'white'
            }]}
            placeholder="Прізвище"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />
          
          <ThemedView style={styles.buttons}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <ThemedText style={styles.cancelButtonText}>Скасувати</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#666666' }]} 
              onPress={handleSubmit}
            >
              <ThemedText style={styles.submitButtonText}>Додати</ThemedText>
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
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});