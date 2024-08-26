import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { VaultItem } from "../../types/vault";
import { useFieldArray } from "react-hook-form";

type FieldItemProps = {
  field: FieldArrayWithId<
    {
      vault: VaultItem[];
    },
    "vault",
    "id"
  >;
  index: number;
  register: UseFormRegister<{
    vault: VaultItem[];
  }>;
  control: Control<{
    vault: VaultItem[];
  }>;
};

export const FieldItem = ({ index, register, control }: FieldItemProps) => {
  const { remove } = useFieldArray({
    name: "vault",
    control,
  });
  return (
    <Box mt="4" mb="4" display="flex" alignItems="flex-end">
      <FormControl>
        <FormLabel htmlFor="website">Website</FormLabel>
        <Input
          type="url"
          id="website"
          placeholder="Website"
          {...register(`vault.${index}.website`, {
            required: "Website is required",
          })}
        />
      </FormControl>

      <FormControl ml="2">
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          placeholder="Username"
          {...register(`vault.${index}.username`, {
            required: "Username is required",
          })}
        />
      </FormControl>

      <FormControl ml="2">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register(`vault.${index}.password`, {
            required: "Password is required",
          })}
        />
      </FormControl>

      <Button
        type="button"
        bg="red.500"
        color="white"
        fontSize="2xl"
        ml="2"
        onClick={() => remove(index)}
      >
        -
      </Button>
    </Box>
  );
};
