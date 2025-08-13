"use client";

import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useEffect, useState } from "react";
import { VehiculoOption } from "../types/option";
import { VehiculoDeleteDialog } from "./VehiculoDeleteDialog";
import { VehiculoDetailsDialog } from "./VehiculoDetailsDialog";
import { useAuth } from "../hooks/useAuth";
import { hasPermission, RolePermissions } from "../actions/types";

interface VehiculoTableDetailsProps {
  vehiculoList: VehiculoOption[];
  onDelete?: (vehiculo: VehiculoOption) => void;
  showActions?: boolean;
}

export const VehiculoTableDetails = memo(function VehiculoTableDetails({
  vehiculoList,
  onDelete,
  showActions = true,
}: VehiculoTableDetailsProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] =
    useState<VehiculoOption | null>(null);
  const [canDelete, setCanDelete] = useState(false);
  const [canViewDetails, setCanViewDetails] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setCanDelete(hasPermission(user, RolePermissions.ALL));
      setCanViewDetails(hasPermission(user, RolePermissions.ALL));
    }
  }, [user, setCanDelete, setCanViewDetails]);

  const handleViewDetails = (vehiculo: VehiculoOption) => {
    setSelectedVehiculo(vehiculo);
    setShowDetailsDialog(true);
  };

  const handleDeleteClick = (vehiculo: VehiculoOption) => {
    setSelectedVehiculo(vehiculo);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedVehiculo) {
      setShowDeleteDialog(false);
      onDelete?.(selectedVehiculo);
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setSelectedVehiculo(null);
  };

  const handleCloseDetailsDialog = () => {
    setShowDetailsDialog(false);
    setSelectedVehiculo(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Tipo de Vehículo</strong>
              </TableCell>
              <TableCell>
                <strong>Número Interno</strong>
              </TableCell>

              {showActions && (
                <TableCell>
                  <strong>Acciones</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {vehiculoList.map((vehiculo) => (
              <TableRow key={vehiculo.id} hover>
                <TableCell>
                  {vehiculo.tipoVehiculo.label.toUpperCase()}
                </TableCell>
                <TableCell>{vehiculo.numInterno}</TableCell>

                {showActions && (
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {canViewDetails && (
                        <IconButton
                          onClick={() => handleViewDetails(vehiculo)}
                          size="small"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          onClick={() => handleDeleteClick(vehiculo)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <VehiculoDetailsDialog
        open={showDetailsDialog}
        onClose={handleCloseDetailsDialog}
        vehiculo={selectedVehiculo}
      />
      <VehiculoDeleteDialog
        open={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        vehiculo={selectedVehiculo}
      />
    </>
  );
});
