import { TUserRole, TUserStatus } from '../../constant/userRole';

export interface IUser {
  name: string;
  email: string;
  title?: string;
  description?: string;
  role: TUserRole;
  avatar?: string;
  password: string;
  status: TUserStatus;
}
