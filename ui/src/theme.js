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
  },
});

export default theme;
