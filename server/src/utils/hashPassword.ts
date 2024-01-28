import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export default hashPassword;
