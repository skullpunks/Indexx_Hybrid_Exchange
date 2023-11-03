import Cryptr from 'cryptr';

const secretKey = 'myTotallySecretKey';
const cryptr = new Cryptr(secretKey);

export function decryptUserkey(userKey: string): string | null {
  try {
    const userPassword = cryptr.decrypt(userKey);
    return userPassword;
  } catch (error) {
    console.error('Error decrypting userKey:', error);
    return null;
  }
}
