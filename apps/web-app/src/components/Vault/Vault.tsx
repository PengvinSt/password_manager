import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { VaultItem } from "../../types/vault";
import { encryptVault } from "../../crypto";
import { saveVault } from "../../api";
import { FormWrapper } from "../Layout";
import { FieldItem } from "./fieldItem";

type VaultProps = {
  vault: VaultItem[];
  vaultKey: string;
};

const Vault = ({ vault = [], vaultKey = "" }: VaultProps) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      vault,
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "vault",
  });

  const mutation = useMutation(saveVault);

  const onSubmit = ({ vault }: { vault: VaultItem[] }) => {
    const encryptedVault = encryptVault({
      vault: JSON.stringify({ vault }),
      vaultKey,
    });

    window.sessionStorage.setItem("vault", JSON.stringify(vault));

    mutation.mutate({
      encryptedVault,
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <FieldItem
          field={field}
          index={index}
          key={field.id}
          register={register}
          control={control}
        />
      ))}

      <Button
        onClick={() => append({ website: "", username: "", password: "" })}
      >
        Add
      </Button>

      <Button ml="8" color="teal" type="submit">
        Save vault
      </Button>
    </FormWrapper>
  );
};

export default Vault;
