import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Schema } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";

export function Planillas() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register("name")}
        label="Nombre"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema>
        name="states"
        options={[
          { id: "1", label: "Mendoza" },
          { id: "2", label: "Buenos Aires" },
        ]}
        label="States"
      />
    </Stack>
  );
}
