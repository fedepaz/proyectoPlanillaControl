import {
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useState } from "react";
import type { BasePersonalOption } from "../types/option";
import { PersonalDetailsDialog } from "./PersonalDetailsDialog.tsx";
import { PersonalDeleteDialog } from "./PersonalDeleteDialog.tsx";
import { hasPermission, RolePermissions, UserRole } from "../actions/types.ts";
import { PersonalStatusChips } from "./PersonalStatusChips.tsx";

interface CompactPersonalCardProps {
  personal: BasePersonalOption;
  onDelete?: (personal: BasePersonalOption) => void;
  showActions?: boolean;
  userRole?: UserRole;
}

export const CompactPersonalCard = memo(function CompactPersonalCard({
  personal,
  onDelete,
  showActions = true,
  userRole = UserRole.AUXILIAR,
}: CompactPersonalCardProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const canDelete = hasPermission(userRole, RolePermissions.ALL);
  const canViewDetails = hasPermission(userRole, RolePermissions.ALL);

  const handleViewDetails = () => {
    setShowDetailsDialog(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    onDelete?.(personal);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleCloseDetailsDialog = () => {
    setShowDetailsDialog(false);
  };

  return (
    <>
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
            <PersonalStatusChips
              personal={personal}
              userRole={userRole}
              direction="column"
            />

            {/* Action buttons - compact */}
            {showActions && (
              <Stack direction="row" spacing={0.5}>
                {canViewDetails && (
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={handleViewDetails}
                    sx={{ p: 0.5 }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                )}
                {canDelete && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={handleDeleteClick}
                    sx={{ p: 0.5 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
      <PersonalDetailsDialog
        open={showDetailsDialog}
        onClose={handleCloseDetailsDialog}
        personal={personal}
      />
      <PersonalDeleteDialog
        open={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        personal={personal}
      />
    </>
  );
});
