import pbkdf2 from "crypto-js/pbkdf2";
import { AES, enc, SHA256 } from "crypto-js";

export const hashPassword = (password: string) => SHA256(password).toString();

export const generateVaultKey = ({
  email,
  hashedPassword,
  salt,
}: {
  email: string;

  hashedPassword: string;
  salt: string;
}) =>
  pbkdf2(`${email}:${hashedPassword}`, salt, {
    keySize: 32,
  }).toString();

export const decryptVault = ({
  vaultKey,
  vault,
}: {
  vaultKey: string;
  vault: string;
}) => {
  const bytes = AES.decrypt(vault, vaultKey);
  const decrypted = bytes.toString(enc.Utf8);

  try {
    return JSON.parse(decrypted).vault;
  } catch (e) {
    return null;
  }
};

export const encryptVault = ({
  vaultKey,
  vault,
}: {
  vaultKey: string;
  vault: string;
}) => AES.encrypt(vault, vaultKey).toString();
