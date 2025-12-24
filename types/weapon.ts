export interface Weapon {
  id: string;
  serialNumber: string;
  model: string;
  firstName: string;
  lastName: string;
  status: 'available' | 'issued';
  dateAdded: string;
}