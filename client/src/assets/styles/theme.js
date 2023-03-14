import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1d1d1d",
    },
    secondary: {
      main: "#f8f1ed",
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial",
  },
});
