import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  IconButton,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useState } from "react";
import { BasePersonalOption } from "../types/option";
import { PersonalDeleteDialog } from "./PersonalDeleteDialog";
import { PersonalDetailsDialog } from "./PersonalDetailsDialog";

interface PersonalTableDetailsProps {
  personalList: BasePersonalOption[];
  onDelete?: (personal: BasePersonalOption) => void;
  showActions?: boolean;
}

export const PersonalTableDetails = memo(function PersonalTableDetails({
  personalList,
  onDelete,
  showActions = true,
}: PersonalTableDetailsProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPersonal, setSelectedPersonal] =
    useState<BasePersonalOption | null>(null);

  const handleViewDetails = (personal: BasePersonalOption) => {
    setSelectedPersonal(personal);
    setShowDetailsDialog(true);
  };

  const handleDeleteClick = (personal: BasePersonalOption) => {
    setSelectedPersonal(personal);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPersonal) {
      setShowDeleteDialog(false);
      setSelectedPersonal(null);
      onDelete?.(selectedPersonal);
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setSelectedPersonal(null);
  };

  const handleCloseDetailsDialog = () => {
    setShowDetailsDialog(false);
    setSelectedPersonal(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Apellido</strong>
              </TableCell>
              <TableCell>
                <strong>DNI</strong>
              </TableCell>
              <TableCell>
                <strong>Legajo</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personalList.map((personal) => (
              <TableRow key={personal.id} hover>
                <TableCell>{personal.firstname}</TableCell>
                <TableCell>{personal.lastname}</TableCell>
                <TableCell>{personal.dni}</TableCell>
                <TableCell>{personal.legajo}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {personal.isUserCreated && (
                      <Chip
                        label="Usuario"
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    )}
                    {personal.needsValidation && (
                      <Chip
                        label="Validacion"
                        size="small"
                        color="error"
                        variant="outlined"
                      />
                    )}
                    {personal.isUserCreated && personal.needsValidation && (
                      <Chip
                        label="Activo"
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </TableCell>
                {showActions && (
                  <TableCell align="center">
                    {/* Action buttons - compact */}
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleViewDetails(personal)}
                        size="small"
                        title="Ver detalles"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(personal)}
                        size="small"
                        title="Eliminar"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PersonalDetailsDialog
        open={showDetailsDialog}
        onClose={handleCloseDetailsDialog}
        personal={selectedPersonal}
      />
      <PersonalDeleteDialog
        open={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        personal={selectedPersonal}
      />
    </>
  );
});
