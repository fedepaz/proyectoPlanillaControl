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
} from "@mui/material";
import {
  Print as PrintIcon,
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
    const printWindow = window.open("", "_blank");
    if (printWindow && printRef.current) {
      printWindow.document.write(`
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
              body { font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>
            ${printRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadPDF = async () => {
    // This would integrate with a PDF library like jsPDF or Puppeteer
    // For now, we'll use the print function
    handlePrint();
  };

  return (
    <Box>
      {/* Control Buttons */}
      <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Tamaño</InputLabel>
          <Select
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
          sx={{ minWidth: 120 }}
        >
          Vista Previa
        </Button>

        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ minWidth: 120 }}
        >
          Imprimir
        </Button>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<PdfIcon />}
          onClick={handleDownloadPDF}
          sx={{ minWidth: 140 }}
        >
          Descargar PDF
        </Button>
      </Box>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: { width: "90vw", height: "90vh" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
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

        <DialogContent sx={{ p: 0, overflow: "auto" }}>
          <Box sx={{ p: 2, backgroundColor: "#f5f5f5", minHeight: "100%" }}>
            <div ref={printRef}>
              <PlanillaPrintForm
                planillaData={planillaData}
                headerConfig={headerConfig}
                paperSize={selectedPaperSize}
              />
            </div>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handlePrint}
            variant="contained"
            startIcon={<PrintIcon />}
          >
            Imprimir
          </Button>
          <Button
            onClick={handleDownloadPDF}
            variant="contained"
            color="secondary"
            startIcon={<PdfIcon />}
          >
            Descargar PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlanillaPDFGenerator;
