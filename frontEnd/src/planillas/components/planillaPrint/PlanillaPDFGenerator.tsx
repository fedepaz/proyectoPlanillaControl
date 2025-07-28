"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  PictureAsPdf as PdfIcon,
  Visibility as PreviewIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  type PaperSize,
  PAPER_SIZES,
  type PlanillaDetailData,
  type HeaderConfig,
} from "../../types/searchById";
import PlanillaPrintForm from "./PlanillaPrintForm";
import { useAuth } from "../../../hooks/useAuth";
import { locationMap } from "../../types/searchTypes";

const PlanillaPDFGenerator: React.FC<{
  planillaData: PlanillaDetailData;
}> = ({ planillaData }) => {
  const { userInfo } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedPaperSize, setSelectedPaperSize] = useState<PaperSize>(
    PAPER_SIZES[0]
  );
  const printRef = useRef<HTMLDivElement>(null);

  const generateHeaderConfig = (): HeaderConfig => {
    const airportCodIata = userInfo?.user?.oficialId?.currentAirportId?.codIATA;
    const location = locationMap[airportCodIata] || airportCodIata;

    return {
      location,
      airportName: userInfo?.user?.oficialId?.currentAirportId?.aeropuerto,
      logoUrl: userInfo?.user?.oficialId?.currentAirportId?.codOACI,
      officialLogoUrl: userInfo?.user?.oficialId?.currentAirportId?.codOACI,
    };
  };

  const headerConfig = generateHeaderConfig();

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handlePrint = () => {
    if (printRef.current) {
      // Create a temporary iframe for printing
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.top = "-10000px";
      iframe.style.left = "-10000px";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";

      document.body.appendChild(iframe);

      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
        <html>
          <head>
            <title>Planilla de Control</title>
            <style>
              @media print {
                @page {
                  size: ${selectedPaperSize.width} ${selectedPaperSize.height};
                  margin: 0;
                }
                body { margin: 0; }
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            </style>
          </head>
          <body>
            ${printRef.current.innerHTML}
          </body>
        </html>
      `);
        iframeDoc.close();

        // Wait for content to load, then print
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();

          // Clean up after printing
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        }, 500);
      }
    }
  };

  const handleDownloadPDF = async () => {
    // This would integrate with a PDF library like jsPDF or Puppeteer
    // For now, we'll use the print function
    handlePrint();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100vw" }}>
      {/* Control Buttons - Responsive Layout */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 1 : 2,
          alignItems: isMobile ? "stretch" : "center",
          width: "100%",
        }}
      >
        <FormControl
          size="small"
          sx={{
            minWidth: isMobile ? "100%" : 120,
            maxWidth: isMobile ? "100%" : "none",
          }}
        >
          <InputLabel id="paper-size-select-label">Tamaño</InputLabel>
          <Select
            labelId="paper-size-select-label"
            value={selectedPaperSize.label}
            label="Tamaño"
            onChange={(e) => {
              const size = PAPER_SIZES.find((s) => s.label === e.target.value);
              if (size) setSelectedPaperSize(size);
            }}
          >
            {PAPER_SIZES.map((size) => (
              <MenuItem key={size.label} value={size.label}>
                {size.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<PreviewIcon />}
          onClick={handlePreview}
          sx={{
            minWidth: isMobile ? "100%" : 120,
            fontSize: isSmallMobile ? "0.875rem" : "inherit",
          }}
        >
          Vista Previa
        </Button>
      </Box>

      {/* Preview Dialog - Responsive */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth={false}
        fullScreen={isMobile}
        aria-labelledby="preview-dialog-title"
        aria-describedby="preview-dialog-description"
        disableEnforceFocus={false}
        disableAutoFocus={false}
        PaperProps={{
          sx: {
            width: isMobile ? "100vw" : "90vw",
            height: isMobile ? "100vh" : "90vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            margin: isMobile ? 0 : "auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: isMobile ? 1 : 3,
            py: isMobile ? 1 : 2,
          }}
        >
          <Typography
            component="span"
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{
              fontSize: isSmallMobile ? "1rem" : "inherit",
              lineHeight: 1.2,
            }}
          >
            Vista Previa - Planilla de Control ({selectedPaperSize.label})
          </Typography>

          <Button
            onClick={() => setPreviewOpen(false)}
            startIcon={<CloseIcon />}
            size="small"
          >
            Cerrar
          </Button>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 0,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              p: isMobile ? 1 : 2,
              backgroundColor: "#f5f5f5",
              minHeight: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              ref={printRef}
              style={{
                transform: isMobile
                  ? `scale(${isSmallMobile ? 0.3 : 0.4})`
                  : "scale(0.8)",
                transformOrigin: "top center",
                width: isMobile ? "250%" : "125%",
                marginBottom: isMobile ? "-60%" : "-20%",
              }}
            >
              <PlanillaPrintForm
                planillaData={planillaData}
                headerConfig={headerConfig}
                paperSize={selectedPaperSize}
              />
            </div>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: isMobile ? 1 : 3,
            py: isMobile ? 1 : 2,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 1 : 0,
          }}
        >
          <Button
            onClick={handleDownloadPDF}
            variant="contained"
            color="secondary"
            startIcon={<PdfIcon />}
            sx={{
              width: isMobile ? "100%" : "auto",
              fontSize: isSmallMobile ? "0.875rem" : "inherit",
            }}
          >
            Descargar PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlanillaPDFGenerator;
