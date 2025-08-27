"use client";

import React, { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Assignment from "@mui/icons-material/Assignment";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Person from "@mui/icons-material/Person";
import Group from "@mui/icons-material/Group";
import Save from "@mui/icons-material/Save";

import type { BasePersonalOption, Option } from "../types/option";
import { useFuncion } from "../planillas/services/queries";

interface PersonalWithFunction {
  personalEmpresa: string;
  funcion: string;
  grupo: string;
}

interface MobileFunctionSelectorProps {
  personalList: BasePersonalOption[];
  onPersonalListChange: (personalList: PersonalWithFunction[]) => void;
  title?: string;
  empresaColor?: string;
  maxSelectionsPerPerson?: number;
  defaultGroup?: string;
}

export const MobileFunctionSelector: React.FC<MobileFunctionSelectorProps> = ({
  personalList,
  onPersonalListChange,
  title = "Asignar Funciones",
  empresaColor = "primary.main",
  maxSelectionsPerPerson = 1,
  defaultGroup = "",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const functionQuery = useFuncion();

  const [functionOptions, setFunctionOptions] = useState<Option[]>([]);
  const [expandedPersons, setExpandedPersons] = useState<Set<string>>(
    new Set()
  );
  const [assignments, setAssignments] = useState<Record<string, string[]>>({});
  const [grupo, setGrupo] = useState(defaultGroup);
  const [hasChanges, setHasChanges] = useState(false);

  const [, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (functionQuery.data) {
      setFunctionOptions(functionQuery.data);
    }
  }, [functionQuery.data]);

  // Track if there are unsaved changes - only show button when ALL personal have assignments
  useEffect(() => {
    const assignedPersons = Object.keys(assignments).filter(
      (personId) => assignments[personId] && assignments[personId].length > 0
    ).length;
    const allPersonsAssigned =
      assignedPersons === personalList.length && personalList.length > 0;
    const hasGroup = grupo.trim() !== "";
    setHasChanges(allPersonsAssigned && hasGroup);
  }, [assignments, grupo, personalList.length]);

  const handleConfirmAssignments = () => {
    const datosTerrestre: PersonalWithFunction[] = [];

    personalList.forEach((person) => {
      const personAssignments = assignments[person.id] || [];

      personAssignments.forEach((functionId: string) => {
        datosTerrestre.push({
          personalEmpresa: person.id, // Just the person ID
          funcion: functionId, // Just the function ID
          grupo: grupo.toString(), // Convert to string if needed
        });
      });
    });

    onPersonalListChange(datosTerrestre);
    setHasChanges(false);
    setIsConfirmed(true);
  };

  const toggleExpanded = (personId: string) => {
    const newExpanded = new Set(expandedPersons);
    if (newExpanded.has(personId)) {
      newExpanded.delete(personId);
    } else {
      newExpanded.add(personId);
    }
    setExpandedPersons(newExpanded);
  };

  const toggleFunction = (personId: string, functionId: string) => {
    const currentAssignments = assignments[personId] || [];
    let newAssignments: string[];

    if (currentAssignments.includes(functionId)) {
      // Remove function
      newAssignments = currentAssignments.filter((id) => id !== functionId);
    } else {
      // Add function (respect max limit)
      if (currentAssignments.length >= maxSelectionsPerPerson) {
        return; // Don't add if at max limit
      }
      newAssignments = [...currentAssignments, functionId];

      // Auto-collapse when function is selected
      setExpandedPersons((prev) => {
        const newExpanded = new Set(prev);
        newExpanded.delete(personId);
        return newExpanded;
      });
    }

    const updatedAssignments = {
      ...assignments,
      [personId]: newAssignments,
    };

    setAssignments(updatedAssignments);
  };

  const getFunctionLabel = (functionId: string) => {
    return (
      functionOptions.find((opt) => opt.id === functionId)?.label || functionId
    );
  };

  const getAssignmentSummary = () => {
    const totalAssignments = Object.values(assignments).reduce(
      (sum, arr) => sum + arr.length,
      0
    );
    const assignedPersons = Object.keys(assignments).filter(
      (personId) => assignments[personId].length > 0
    ).length;
    return { totalAssignments, assignedPersons };
  };

  const { totalAssignments, assignedPersons } = getAssignmentSummary();

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: empresaColor,
        bgcolor: "background.paper",
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
          <Box display="flex" alignItems="center" gap={1}>
            <Assignment sx={{ color: empresaColor }} />
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color={empresaColor}
            >
              {title}
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Chip
              label={`${totalAssignments} asignaciones`}
              size="small"
              color="primary"
              variant="filled"
            />
          </Box>
        </Box>

        {/* Group Input */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Grupo"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            size="small"
            inputMode="numeric"
            InputProps={{
              startAdornment: <Group sx={{ mr: 1, color: "text.secondary" }} />,
            }}
            helperText="Este grupo se aplicará a todas las asignaciones"
          />
        </Box>

        {totalAssignments === 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Toca en cada empleado para asignar sus funciones
          </Alert>
        )}

        <Stack spacing={1}>
          {personalList.map((person) => {
            const isExpanded = expandedPersons.has(person.id);
            const personAssignments = assignments[person.id] || [];
            const hasAssignments = personAssignments.length > 0;

            return (
              <Card
                key={person.id}
                variant="outlined"
                sx={{
                  border: hasAssignments ? "2px solid" : "1px solid",
                  borderColor: hasAssignments ? "success.main" : "divider",
                  bgcolor: hasAssignments ? "success.50" : "background.paper",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    cursor: "pointer",
                  }}
                  onClick={() => toggleExpanded(person.id)}
                >
                  <Person
                    sx={{ mr: 1, color: "text.secondary" }}
                    fontSize="small"
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="500">
                      {person.firstname} {person.lastname}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      DNI: {person.dni}
                    </Typography>
                  </Box>

                  {/* Assignment chips */}
                  {hasAssignments && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        mr: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {personAssignments.map((functionId) => (
                        <Chip
                          key={functionId}
                          label={getFunctionLabel(functionId)}
                          size="small"
                          color="success"
                          variant="filled"
                          sx={{ height: 20 }}
                        />
                      ))}
                      {grupo && (
                        <Chip
                          label={`Grupo: ${grupo}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ height: 20 }}
                        />
                      )}
                    </Box>
                  )}

                  <IconButton size="small">
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>

                <Collapse in={isExpanded}>
                  <Box
                    sx={{
                      p: 1.5,
                      pt: 0,
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1, display: "block" }}
                    >
                      Selecciona función
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {functionOptions.map((func) => {
                        const isSelected = personAssignments.includes(func.id);
                        const canSelect =
                          personAssignments.length < maxSelectionsPerPerson ||
                          isSelected;

                        return (
                          <Chip
                            key={func.id}
                            label={func.label}
                            clickable={canSelect}
                            color={isSelected ? "primary" : "default"}
                            variant={isSelected ? "filled" : "outlined"}
                            onClick={() =>
                              canSelect && toggleFunction(person.id, func.id)
                            }
                            sx={{
                              opacity: canSelect ? 1 : 0.5,
                              "&:hover": canSelect
                                ? {}
                                : { backgroundColor: "transparent" },
                            }}
                            icon={isSelected ? <CheckCircle /> : undefined}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                </Collapse>
              </Card>
            );
          })}
        </Stack>

        {/* Summary */}
        {totalAssignments > 0 && (
          <Alert
            severity={
              assignedPersons === personalList.length ? "success" : "warning"
            }
            sx={{ mt: 2 }}
          >
            <Typography variant="body2">
              {assignedPersons === personalList.length
                ? `✓ Todos los empleados tienen el grupo y las funciones asignadas`
                : `${personalList.length - assignedPersons} empleado${
                    personalList.length - assignedPersons > 1 ? "s" : ""
                  } sin asignar`}
            </Typography>
          </Alert>
        )}

        {/* Confirmation Button */}
        {hasChanges && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Save />}
              onClick={handleConfirmAssignments}
              sx={{
                minWidth: 200,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Confirmar Asignaciones
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
