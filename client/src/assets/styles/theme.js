import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#333",
          color: "#fff",
          padding: "15px",
          width: "100%",
          ":hover": {
            backgroundColor: "rgb(53, 53, 196)",
            color: "#fff",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export { theme };
