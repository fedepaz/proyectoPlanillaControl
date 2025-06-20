import {
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface EmpleadoCardProps {
  id: string;
  dni: string;
  firstname: string;
  lastname: string;
  empresaId: string;
  legajo: string;
}

export const CompactPersonalCard = memo(function CompactPersonalCard({
  id,
  dni,
  firstname,
  lastname,
  empresaId,
  legajo,
}: EmpleadoCardProps) {
  const [selectedPersonal, setSelectedPersonal] =
    useState<EmpleadoCardProps | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const personal = {
    id,
    dni,
    firstname,
    lastname,
    empresaId,
    legajo,
  };

  const handleViewDetails = (personal: EmpleadoCardProps) => {
    setSelectedPersonal(personal);
    setShowDetailsDialog(true);
  };

  const handleDeleteClick = (personal: EmpleadoCardProps) => {
    setSelectedPersonal(personal);
    setShowDeleteDialog(true);
  };

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {/* Employee info - takes most space */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight="bold" noWrap>
              {personal.lastname}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              DNI: {personal.dni}
            </Typography>
          </Box>

          {/* Action buttons - compact */}
          <Stack direction="row" spacing={0.5}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleViewDetails(personal)}
              sx={{ p: 0.5 }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteClick(personal)}
              sx={{ p: 0.5 }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
});
