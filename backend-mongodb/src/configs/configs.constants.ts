import { config } from 'dotenv';
config();

export const appConfig = {
  port: process.env.APP_PORT,
};

export const bcryptConfig = {
  saltRound: process.env.BCRYPT_SALT_ROUNDS as unknown as number,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export const sendMailConfig = {
  host: process.env.MAIL_HOST,
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASSWORD,
};
