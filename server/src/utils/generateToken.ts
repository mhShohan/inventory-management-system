import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, config.jwt_secret!, { expiresIn: '2d' });
};

export default generateToken;
