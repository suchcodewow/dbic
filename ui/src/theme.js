import { createTheme } from "@mui/material/styles";
import { indigo, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: teal[500],
    },
    background: { default: "#FFFFFF" },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
        fontWeight: "bold",
      },
    },
    MuiCard: {
      defaultProps: { elevation: "0", border: "1", borderColor: "#FFFFFF" },
      styleOverrides: { "&:hover": { boxShadow: "5" } },
    },
  },
});

export default theme;
