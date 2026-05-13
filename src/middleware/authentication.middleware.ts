import pathModule from 'path';
import config from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

const environment = process.env.NODE_ENV || 'dev';
const path = pathModule.join(process.cwd(), '.env.', environment);
config.config({ path });

export default function authenticate(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token to redeem.');

  try {
    const privateKey = process.env.KEY;
    const decodedToken: JwtPayload = jwt.verify(token, privateKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
}
