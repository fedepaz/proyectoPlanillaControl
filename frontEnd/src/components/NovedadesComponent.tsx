import React from "react";
import {
  Box,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
} from "@mui/material";

interface NovedadesComponentProps {
  /** Current state of the switch (whether observations are enabled) */
  isRequired: boolean;
  /** Current observation text */
  observaciones: string;
  /** Callback when switch state changes */
  onRequiredChange: (isRequired: boolean) => void;
  /** Callback when observation text changes */
  onObservacionesChange: (observaciones: string) => void;
  /** Label for the switch */
  switchLabel?: string;
  /** Label for the text field */
  textFieldLabel?: string;
  /** Placeholder text for the text field */
  placeholder?: string;
  /** Whether observations are globally required when switch is on */
  required?: boolean;
  /** Number of rows for the text field */
  rows?: number;
  /** Size variant for components */
  size?: "small" | "medium";
  /** Additional sx props for the container */
  sx?: object;
}

export const NovedadesComponent: React.FC<NovedadesComponentProps> = ({
  isRequired,
  observaciones,
  onRequiredChange,
  onObservacionesChange,
  switchLabel = "Agregar observaciones",
  textFieldLabel = "Observaciones",
  placeholder = "Escriba sus observaciones...",
  required = false,
  rows = 2,
  size = "small",
  sx = {},
}) => {
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    onRequiredChange(newValue);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onObservacionesChange(event.target.value);
  };

  const hasError = required && isRequired && !observaciones?.trim();

  return (
    <Box sx={sx}>
      <FormControlLabel
        control={
          <Switch
            checked={isRequired}
            onChange={handleSwitchChange}
            color="primary"
            size={size}
          />
        }
        label={
          <Typography variant="caption" color="text.secondary">
            {switchLabel}
          </Typography>
        }
        sx={{ mb: isRequired ? 1 : 0 }}
      />

      {isRequired && (
        <TextField
          fullWidth
          multiline
          rows={rows}
          label={textFieldLabel}
          value={observaciones || ""}
          onChange={handleTextChange}
          placeholder={placeholder}
          size={size}
          required={required}
          error={hasError}
          helperText={hasError ? "Observaciones requeridas" : ""}
        />
      )}
    </Box>
  );
};
