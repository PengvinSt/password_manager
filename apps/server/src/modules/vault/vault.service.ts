import { VaultModel } from "./vault.model";

export const createVault = async (input: { user: string; salt: string }) =>
  VaultModel.create(input);

export const updateVault = async ({
  userId,
  data,
}: {
  userId: string;
  data: string;
}) => {
  return VaultModel.updateOne({ user: userId }, { data });
};

export const findVaultByUser = async (userId: string) =>
  VaultModel.findOne({ user: userId });
