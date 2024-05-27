import { useForm } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import { Schema, schema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function Planillas() {
  const {
    register,
    formState: { errors },
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
  });

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
    </Stack>
  );
}
