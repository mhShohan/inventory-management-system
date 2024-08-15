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
  { keyName: 'role' },
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