"use client";

import type React from "react";
import type { JSX } from "react";
import { PaperSize } from "../../types/searchById";
import {
  useTheme,
  Typography,
  Chip,
  alpha,
  Paper,
  Box,
  Divider,
} from "@mui/material";

interface ProfessionalDocumentProps {
  markdownContent: string;
  paperSize: PaperSize;
  title?: string;
  subtitle?: string;
  footer?: string;
  companyName?: string;
  isDisplayMode?: boolean; // New prop for display mode
}

const ProfessionalDocument: React.FC<ProfessionalDocumentProps> = ({
  markdownContent,
  paperSize,
  title = "Documento",
  subtitle = "Sistema de Gestión",
  footer = `© ${new Date().getFullYear()} cabecitaNegraDevOps. Todos los derechos reservados.`,
  isDisplayMode = false,
}) => {
  const theme = useTheme();
  const isA4 = paperSize.label === "A4";

  // Professional page styling using MUI theme
  const pageStyle: React.CSSProperties = {
    width: isDisplayMode ? "100%" : paperSize.width, // Full width in display mode
    minHeight: isDisplayMode ? "auto" : paperSize.height, // Auto height in display mode
    maxHeight: isDisplayMode ? "none" : paperSize.height, // No max height in display mode
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: theme.typography.fontFamily,
    lineHeight: 1.6,
    color: theme.palette.text.primary,
    pageBreakAfter: isDisplayMode ? "auto" : "always", // No page breaks in display mode
    position: "relative",
    boxShadow: isDisplayMode ? "none" : theme.shadows[3], // No shadow in display mode
    border: isDisplayMode ? "none" : `1px solid ${theme.palette.divider}`, // No border in display mode
  };

  const parseInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    const regex = /(\*\*([^*]+?)\*\*|`([^`]+?)`|\*([^*]+?)\*)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      if (match[1].startsWith("**")) {
        parts.push(
          <Typography
            key={match.index}
            component="span"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              fontSize: isDisplayMode
                ? { xs: "0.9rem", sm: "1rem" }
                : "inherit", // Responsive font size
            }}
          >
            {match[2]}
          </Typography>
        );
      } else if (match[1].startsWith("`")) {
        parts.push(
          <Chip
            key={match.index}
            label={match[3]}
            size="small"
            variant="outlined"
            sx={{
              height: "auto",
              fontSize: isDisplayMode
                ? { xs: "0.75rem", sm: "0.85rem" }
                : "0.85rem", // Responsive font size
              fontFamily: "monospace",
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              borderColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.primary.dark,
              "& .MuiChip-label": {
                padding: "2px 8px",
              },
            }}
          />
        );
      } else if (match[1].startsWith("*")) {
        parts.push(
          <Typography
            key={match.index}
            component="span"
            sx={{
              fontStyle: "italic",
              color: theme.palette.text.secondary,
              fontSize: isDisplayMode
                ? { xs: "0.9rem", sm: "1rem" }
                : "inherit", // Responsive font size
            }}
          >
            {match[4]}
          </Typography>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return <>{parts}</>;
  };

  const parseMarkdownToJsx = (markdown: string) => {
    const lines = markdown.split("\n");
    const elements: JSX.Element[] = [];
    let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

    const flushList = () => {
      if (currentList) {
        elements.push(
          <Paper
            key={`list-${elements.length}`}
            elevation={1}
            sx={{
              my: isDisplayMode ? { xs: 1.5, sm: 2 } : 2, // Responsive margin
              p: isDisplayMode ? { xs: 2, sm: 2.5 } : 2.5, // Responsive padding
              backgroundColor: alpha(theme.palette.background.default, 0.5),
              borderLeft: `4px solid ${theme.palette.primary.main}`,
            }}
          >
            <Box
              component={currentList.type}
              sx={{
                m: 0,
                pl: isDisplayMode ? { xs: 1.5, sm: 2 } : 2, // Responsive padding
                "& li": {
                  mb: isDisplayMode ? { xs: 1, sm: 1.5 } : 1.5, // Responsive margin
                  lineHeight: 1.7,
                },
              }}
            >
              {currentList.items.map((item, idx) => (
                <Typography
                  component="li"
                  key={idx}
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: isDisplayMode
                      ? { xs: "0.95rem", sm: "1rem" }
                      : "1rem", // Responsive font size
                  }}
                >
                  {parseInlineMarkdown(item)}
                </Typography>
              ))}
            </Box>
          </Paper>
        );
        currentList = null;
      }
    };

    lines.forEach((line, index) => {
      line = line.trim();
      if (line.startsWith("# ")) {
        flushList();
        elements.push(
          <Box
            key={index}
            sx={{
              mt: index === 0 ? 0 : { xs: 3, sm: 4 },
              mb: { xs: 2, sm: 3 },
            }}
          >
            <Typography
              variant={isDisplayMode ? "h4" : "h3"} // Smaller heading for display mode
              component="h1"
              sx={{
                fontWeight: 800,
                color: theme.palette.primary.main,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 1,
                fontSize: isDisplayMode
                  ? { xs: "1.8rem", sm: "2.2rem" }
                  : "inherit", // Responsive font size
              }}
            >
              {parseInlineMarkdown(line.substring(2))}
            </Typography>
            <Divider
              sx={{
                height: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                border: "none",
              }}
            />
          </Box>
        );
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant={isDisplayMode ? "h5" : "h4"} // Smaller heading for display mode
            component="h2"
            sx={{
              mt: { xs: 3, sm: 4 },
              mb: { xs: 1.5, sm: 2 },
              fontWeight: 700,
              color: theme.palette.primary.dark,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: isDisplayMode ? -12 : -16, // Responsive position
                top: 6,
                width: 4,
                height: "80%",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 2,
              },
              fontSize: isDisplayMode
                ? { xs: "1.4rem", sm: "1.6rem" }
                : "inherit", // Responsive font size
            }}
          >
            {parseInlineMarkdown(line.substring(3))}
          </Typography>
        );
      } else if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant={isDisplayMode ? "h6" : "h5"} // Smaller heading for display mode
            component="h3"
            sx={{
              mt: { xs: 2.5, sm: 3 },
              mb: { xs: 1, sm: 1.5 },
              fontWeight: 600,
              color: theme.palette.primary.light,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&::before": {
                content: '"▸"',
                color: theme.palette.secondary.main,
                fontWeight: 800,
              },
              fontSize: isDisplayMode
                ? { xs: "1.2rem", sm: "1.35rem" }
                : "inherit", // Responsive font size
            }}
          >
            {parseInlineMarkdown(line.substring(4))}
          </Typography>
        );
      } else if (line.match(/^\*\s/)) {
        if (!currentList || currentList.type !== "ul") {
          flushList();
          currentList = { type: "ul", items: [] };
        }
        currentList.items.push(line.substring(line.indexOf("* ") + 2));
      } else if (line.match(/^\d+\.\s/)) {
        if (!currentList || currentList.type !== "ol") {
          flushList();
          currentList = { type: "ol", items: [] };
        }
        currentList.items.push(line.substring(line.indexOf(". ") + 2));
      } else if (
        line.startsWith("⚠️ ") ||
        line.includes("Importante:") ||
        line.includes("Nota:")
      ) {
        flushList();
        elements.push(
          <Paper
            key={index}
            elevation={2}
            sx={{
              mt: { xs: 2, sm: 2.5 },
              mb: { xs: 2, sm: 2.5 },
              p: { xs: 2.5, sm: 3 }, // Responsive padding
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.warning.main, 0.08),
              borderLeft: `6px solid ${theme.palette.warning.main}`,
              border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
              position: "relative",
              "&::before": {
                content: '"⚠"',
                position: "absolute",
                top: 16,
                left: 16,
                fontSize: "1.5rem",
                color: theme.palette.warning.main,
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.warning.dark,
                fontWeight: 600,
                margin: 0,
                pl: 4,
                lineHeight: 1.7,
                fontSize: isDisplayMode
                  ? { xs: "0.95rem", sm: "1rem" }
                  : "1rem", // Responsive font size
              }}
            >
              {parseInlineMarkdown(line.replace("⚠️ ", ""))}
            </Typography>
          </Paper>
        );
      } else if (line.startsWith("---")) {
        flushList();
        elements.push(
          <Box key={index} sx={{ my: { xs: 3, sm: 4 } }}>
            <Divider
              sx={{
                "&::before, &::after": {
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                },
              }}
            >
              <Chip
                label="•••"
                size="small"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              />
            </Divider>
          </Box>
        );
      } else if (line.length > 0) {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant="body1"
            sx={{
              mb: { xs: 1.5, sm: 2 },
              color: theme.palette.text.primary,
              textAlign: "justify",
              lineHeight: 1.8,
              fontSize: isDisplayMode ? { xs: "0.95rem", sm: "1rem" } : "1rem", // Responsive font size
            }}
          >
            {parseInlineMarkdown(line)}
          </Typography>
        );
      } else {
        flushList();
        elements.push(<Box key={index} sx={{ height: theme.spacing(2) }} />);
      }
    });
    flushList();
    return elements;
  };

  const headerHeight = isDisplayMode
    ? { xs: theme.spacing(8), md: theme.spacing(10) }
    : isA4
    ? "25mm"
    : "30mm";
  const footerHeight = isDisplayMode
    ? { xs: theme.spacing(6), md: theme.spacing(8) }
    : isA4
    ? "20mm"
    : "25mm";

  // MUI-styled header
  const DocumentHeader = () => (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: headerHeight, // Responsive height
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isDisplayMode
          ? { xs: theme.spacing(2), sm: theme.spacing(3) }
          : `0 ${isA4 ? "20mm" : "25mm"}`, // Responsive padding
        zIndex: 2,
        borderRadius: 0,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            fontSize: isDisplayMode ? { xs: "1rem", sm: "1.1rem" } : "1.1rem", // Responsive font size
          }}
        >
          {title.toUpperCase()}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: alpha(theme.palette.primary.contrastText, 0.8),
            fontSize: isDisplayMode
              ? { xs: "0.7rem", sm: "0.75rem" }
              : "0.75rem", // Responsive font size
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Paper>
  );

  // MUI-styled footer
  const DocumentFooter = () => (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: footerHeight, // Responsive height
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isDisplayMode
          ? { xs: theme.spacing(1), sm: theme.spacing(2) }
          : `0 ${isA4 ? "20mm" : "25mm"}`, // Responsive padding
        zIndex: 2,
        borderRadius: 0,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: isDisplayMode ? { xs: "0.75rem", sm: "0.8rem" } : "0.8rem", // Responsive font size
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {footer}
      </Typography>
    </Paper>
  );

  const pages = [parseMarkdownToJsx(markdownContent)]; // Single page for now

  return (
    <>
      {pages.map((pageContent, pageIndex) => (
        <Box
          key={pageIndex}
          sx={{
            ...pageStyle,
            pageBreakBefore: pageIndex > 0 ? "always" : "auto",
          }}
        >
          <DocumentHeader />
          {/* Main content area */}
          <Box>
            {/* Content */}
            <Box sx={{ position: "relative", zIndex: 1, pb: 10 }}>
              {pageContent}
            </Box>
          </Box>
          <DocumentFooter />
        </Box>
      ))}
    </>
  );
};

export default ProfessionalDocument;
