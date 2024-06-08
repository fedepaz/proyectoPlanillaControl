import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFCheckBox<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel> {label}</FormLabel>
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value.includes(option._id)}
                    onChange={() => {
                      if (value.includes(option._id)) {
                        onChange(
                          (value as string[]).filter(
                            (item) => item !== option._id
                          )
                        );
                      } else {
                        onChange([...value, option._id]);
                      }
                    }}
                    key={option._id}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
    ></Controller>
  );
}
