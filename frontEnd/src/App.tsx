import { PlanillasProvider } from "./planillas/components/PlanillasProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";

const blueGrayMode = createTheme({
  palette: {
    primary: {
      main: blueGrey[800],
    },
    secondary: {
      main: blueGrey[500],
    },
    background: {
      default: blueGrey[100],
      paper: blueGrey[50],
    },
    text: {
      primary: blueGrey[900],
      secondary: blueGrey[700],
    },
  },
});

export function App() {
  return (
    <>
      <ThemeProvider theme={blueGrayMode}>
        <CssBaseline>
          <PlanillasProvider />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}
