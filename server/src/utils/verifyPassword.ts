import bcrypt from 'bcrypt';
import CustomError from '../errors/customError';

const verifyPassword = async (password: string, hashedPassword: string) => {
  const matchedPassword = await bcrypt.compare(password, hashedPassword);

  if (!matchedPassword) {
    throw new CustomError(400, 'Wrong Credentials!');
  }
};

export default verifyPassword;
