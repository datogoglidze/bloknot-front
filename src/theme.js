import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      "@media (max-width:650px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      "@media (max-width:650px)": {
        fontSize: "1.8rem",
      },
    },
    body1: {
      "@media (max-width:650px)": {
        fontSize: "0.85rem",
      },
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "center",
          "@media (max-width:650px)": {
            fontSize: "0.75rem",
            padding: "10px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "@media (max-width:650px)": {
            fontSize: "0.75rem",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            "@media (max-width:650px)": {
              fontSize: "0.875rem",
            },
          },
        },
      },
    },
  },
});

export default theme;
