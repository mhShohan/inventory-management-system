export interface IUser {
  name: string;
  email: string;
  title?: string;
  description?: string;
  role: string;
  avatar?: string;
  password: string;
  status: string;
  address?: string;
  phone?: string
  city?: string;
  country?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export const profileKeys = [
  { keyName: 'name' },
  { keyName: 'email' },
  { keyName: 'title' },
  { keyName: 'description' },
  { keyName: 'status' },
  { keyName: 'address' },
  { keyName: 'phone' },
  { keyName: 'city' },
  { keyName: 'country' },
  { keyName: 'facebook' },
  { keyName: 'twitter' },
  { keyName: 'linkedin' },
  { keyName: 'instagram' },
]

export const profileInputFields = [
  { id: 1, name: 'name', label: 'Name' },
  { id: 2, name: 'email', label: 'Email' },
  { id: 3, name: 'title', label: 'Title' },
  { id: 4, name: 'description', label: 'Description' },
  { id: 7, name: 'address', label: 'Address' },
  { id: 8, name: 'phone', label: 'Phone' },
  { id: 9, name: 'city', label: 'City' },
  { id: 10, name: 'country', label: 'Country' },
  { id: 11, name: 'facebook', label: 'Facebook' },
  { id: 12, name: 'twitter', label: 'Twitter' },
  { id: 13, name: 'linkedin', label: 'Linkedin' },
  { id: 14, name: 'instagram', label: 'Instagram' },
]