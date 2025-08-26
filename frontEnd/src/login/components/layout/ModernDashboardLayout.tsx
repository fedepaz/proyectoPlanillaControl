"use client";
import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ActionButton } from "../../../actions/types";
import { Tab, Tabs } from "@mui/material";

const drawerWidth = 260;

interface ModernDashboardLayoutProps {
  children: (selectedTab: number) => React.ReactNode;
  sections: { label: string; actions: ActionButton[] }[];
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export const ModernDashboardLayout = ({
  children,
  sections,
  mobileOpen,
  onDrawerToggle,
}: ModernDashboardLayoutProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const drawerContent = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {sections.map((section, index) => (
            <Tab
              label={section.label}
              key={index}
              onClick={() => onDrawerToggle()}
            />
          ))}
        </Tabs>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isDesktop ? "permanent" : "temporary"}
          open={isDesktop ? true : mobileOpen}
          onClose={onDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(42, 45, 50, 0.8)"
                  : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          overflow: "auto",
        }}
      >
        {children(selectedTab)}
      </Box>
    </Box>
  );
};
