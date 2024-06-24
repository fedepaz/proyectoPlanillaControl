import { Autocomplete, Box, TextField, Checkbox } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFAutocomplete<T extends FieldValues>({
  name,
  options = [],
  label,
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options || []}
          value={value.map((_id: string) =>
            options?.find((item) => item._id === _id)
          )}
          getOptionLabel={(option) =>
            options?.find((item) => item._id === option._id)?.label ?? ""
          }
          isOptionEqualToValue={(option, newValue) =>
            option._id === newValue._id
          }
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item._id));
          }}
          disableCloseOnSelect
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
            />
          )}
          renderOption={(props, option, { selected }) => {
            const { key, ...restProps } = props as { key: React.Key } & Omit<
              React.HTMLAttributes<HTMLLIElement>,
              "key"
            >;
            return (
              <Box component="li" key={key} {...restProps}>
                <Checkbox
                  icon={<CheckBoxOutlineBlank />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={selected}
                />
                {option.label}
              </Box>
            );
          }}
        />
      )}
    />
  );
}
