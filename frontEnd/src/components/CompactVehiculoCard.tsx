"use client";

import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useEffect, useState } from "react";
import type { VehiculoOption } from "../types/option";
import { VehiculoDetailsDialog } from "./VehiculoDetailsDialog.tsx";
import { VehiculoDeleteDialog } from "./VehiculoDeleteDialog.tsx";
import { hasPermission, RolePermissions } from "../actions/types.ts";
import { useAuth } from "../hooks/useAuth.ts";

interface CompactVehiculoCardProps {
  vehiculo: VehiculoOption;
  onDelete?: (vehiculo: VehiculoOption) => void;
  showActions?: boolean;
}

export const CompactVehiculoCard = memo(function CompactVehiculoCard({
  vehiculo,
  onDelete,
  showActions = true,
}: CompactVehiculoCardProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canViewDetails, setCanViewDetails] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setCanDelete(hasPermission(user, RolePermissions.ALL));
      setCanViewDetails(hasPermission(user, RolePermissions.ALL));
    }
  }, [user, setCanDelete, setCanViewDetails]);

  const handleViewDetails = () => {
    setShowDetailsDialog(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    onDelete?.(vehiculo);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleCloseDetailsDialog = () => {
    setShowDetailsDialog(false);
  };

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body1" fontWeight="bold" noWrap>
              {vehiculo.tipoVehiculo.label.toUpperCase()}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Número interno: {vehiculo.numInterno}
            </Typography>
          </Box>
          {showActions && (
            <Stack direction="row" spacing={1}>
              {canViewDetails && (
                <IconButton onClick={handleViewDetails} size="small">
                  <VisibilityIcon />
                </IconButton>
              )}
              {canDelete && (
                <IconButton onClick={handleDeleteClick} size="small">
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
          )}
        </Stack>
      </CardContent>

      <VehiculoDetailsDialog
        open={showDetailsDialog}
        onClose={handleCloseDetailsDialog}
        vehiculo={vehiculo}
      />

      <VehiculoDeleteDialog
        open={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        vehiculo={vehiculo}
      />
    </Card>
  );
});
