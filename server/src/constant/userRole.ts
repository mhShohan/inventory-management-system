export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const;

export const UserStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  BLOCK: 'BLOCK'
} as const;

export type TUserRole = 'ADMIN' | 'USER';
export type TUserStatus = 'PENDING' | 'ACTIVE' | 'BLOCK';
