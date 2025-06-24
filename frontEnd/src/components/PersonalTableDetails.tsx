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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useEffect, useState } from "react";
import { BasePersonalOption } from "../types/option";
import { PersonalDeleteDialog } from "./PersonalDeleteDialog";
import { PersonalDetailsDialog } from "./PersonalDetailsDialog";
import { PersonalStatusChips } from "./PersonalStatusChips";
import { useAuth } from "../hooks/useAuth";
import { hasPermission, RolePermissions } from "../actions/types";

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
  const [canDelete, setCanDelete] = useState(false);
  const [canViewDetails, setCanViewDetails] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setCanDelete(hasPermission(user, RolePermissions.ALL));
      setCanViewDetails(hasPermission(user, RolePermissions.ALL));
    }
  }, [user, setCanDelete, setCanViewDetails]);

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
              <TableCell align="center">
                <strong>Estado</strong>
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
                {showActions && (
                  <TableCell align="center">
                    {/* Action buttons - compact */}
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {canViewDetails && (
                        <IconButton
                          color="primary"
                          onClick={() => handleViewDetails(personal)}
                          size="small"
                          title="Ver detalles"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(personal)}
                          size="small"
                          title="Eliminar"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                )}

                <TableCell align="center">
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    <PersonalStatusChips
                      personal={personal}
                      direction="column"
                    />
                  </Stack>
                </TableCell>
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
