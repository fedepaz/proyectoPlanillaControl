"use client";

import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import { memo } from "react";
import type { BasePersonalOption } from "../types/option";

interface ConfirmedListComponentProps {
  personalList: BasePersonalOption[];
  title?: string;
  empresaColor: string;
}

export const ConfirmedListComponent = memo(function ConfirmedListComponent({
  personalList,
  title,
  empresaColor,
}: ConfirmedListComponentProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: empresaColor,
        bgcolor: "success.50",
      }}
    >
      <CardContent sx={{ p: isMobile ? 2 : 3 }}>
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={1} mr={2}>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color={empresaColor}
              fontWeight="600"
            >
              {title}
            </Typography>
            <CheckCircleIcon
              color="success"
              fontSize={isMobile ? "medium" : "large"}
            />
          </Box>
        </Box>

        {/* Employee List */}
        <List
          dense={isMobile}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {personalList.map((person, index) => (
            <ListItem
              key={person.id}
              divider={index < personalList.length - 1}
              sx={{ py: isMobile ? 1 : 1.5 }}
            >
              <Box sx={{ mr: 2, color: "text.secondary" }}>
                <PersonIcon fontSize="small" />
              </Box>
              <ListItemText
                primary={
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    fontWeight="500"
                  >
                    {person.firstname} {person.lastname}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    color="text.secondary"
                  >
                    DNI: {person.dni} • Legajo: {person.legajo}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
});
