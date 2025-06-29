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
import { memo, useEffect, useState } from "react";
import type { BasePersonalOption } from "../types/option";
import { PersonalDetailsDialog } from "./PersonalDetailsDialog.tsx";
import { PersonalDeleteDialog } from "./PersonalDeleteDialog.tsx";
import { hasPermission, RolePermissions } from "../actions/types.ts";
import { PersonalStatusChips } from "./PersonalStatusChips.tsx";
import { useAuth } from "../hooks/useAuth.ts";

interface CompactPersonalCardProps {
  personal: BasePersonalOption;
  onDelete?: (personal: BasePersonalOption) => void;
  showActions?: boolean;
}

export const CompactPersonalCard = memo(function CompactPersonalCard({
  personal,
  onDelete,
  showActions = true,
}: CompactPersonalCardProps) {
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
          <Stack
            direction={showActions ? "row" : "column"}
            alignItems={showActions ? "center" : "flex-start"}
            spacing={1}
          >
            {/* Employee info - takes most space */}
            <Box sx={{ minWidth: 0 }}>
              {showActions ? (
                <Typography variant="body2" fontWeight="bold" noWrap>
                  {personal.lastname}
                </Typography>
              ) : (
                <Typography variant="body2" fontWeight="bold" noWrap>
                  {personal.lastname} - {personal.firstname}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary" noWrap>
                DNI: {personal.dni}
              </Typography>
              <PersonalStatusChips personal={personal} direction="row" />
            </Box>

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
