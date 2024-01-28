import { jwtDecode } from 'jwt-decode'
import { TUser } from '../redux/services/authSlice'

const decodeToken = (token: string): TUser => {
  return jwtDecode(token)
}

export default decodeToken