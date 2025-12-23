import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Weapon } from '@/types/weapon';

interface WeaponContextType {
  weapons: Weapon[];
  addWeapon: (weapon: Omit<Weapon, 'id' | 'dateAdded'>) => void;
  searchWeapons: (query: string) => Weapon[];
}

const WeaponContext = createContext<WeaponContextType | undefined>(undefined);

export const WeaponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  useEffect(() => {
    loadWeapons();
  }, []);

  const loadWeapons = async () => {
    try {
      const stored = await AsyncStorage.getItem('weapons');
      if (stored) {
        setWeapons(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading weapons:', error);
    }
  };

  const saveWeapons = async (weaponList: Weapon[]) => {
    try {
      await AsyncStorage.setItem('weapons', JSON.stringify(weaponList));
    } catch (error) {
      console.error('Error saving weapons:', error);
    }
  };

  const addWeapon = (weaponData: Omit<Weapon, 'id' | 'dateAdded'>) => {
    const newWeapon: Weapon = {
      ...weaponData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };
    const updatedWeapons = [...weapons, newWeapon];
    setWeapons(updatedWeapons);
    saveWeapons(updatedWeapons);
  };

  const searchWeapons = (query: string): Weapon[] => {
    if (!query.trim()) return weapons;
    
    const lowercaseQuery = query.toLowerCase();
    return weapons.filter(weapon => 
      weapon.serialNumber.toLowerCase().includes(lowercaseQuery) ||
      weapon.firstName.toLowerCase().includes(lowercaseQuery) ||
      weapon.lastName.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <WeaponContext.Provider value={{ weapons, addWeapon, searchWeapons }}>
      {children}
    </WeaponContext.Provider>
  );
};

export const useWeapons = () => {
  const context = useContext(WeaponContext);
  if (!context) {
    throw new Error('useWeapons must be used within WeaponProvider');
  }
  return context;
};