import argon2 from "argon2";
import crypto from "crypto";
// generate salt
export const generateSalt = () => crypto.randomBytes(64).toString("hex");

import { UserModel } from "./user.model";

// create a user
export const createUser = async (input: {
  hashedPassword: string;
  email: string;
}) => {
  return UserModel.create({
    email: input.email,
    password: input.hashedPassword,
  });
};

export const genHash = (password: string) => argon2.hash(password);

export const findUserByEmailAndPassword = async ({
  email,
  hashedPassword,
}: {
  email: string;
  hashedPassword: string;
}) => {
  const user = await UserModel.findOne({ email });

  const hash = await genHash(hashedPassword);

  if (!user || !argon2.verify(user.password, hash)) {
    return null;
  }

  return user;
};
