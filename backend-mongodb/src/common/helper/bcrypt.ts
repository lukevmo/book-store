import * as bcrypt from 'bcrypt';

export const validatePassword = function validatePassword(
  password: string,
  currentPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, currentPassword);
};

export const hashPassword = async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  return {
    salt,
    hashPassword,
  };
};
