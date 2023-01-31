import { createTheme } from "@mui/material/styles";

export const colors = {
  primary: {
    100: "#cfdbfc",
    200: "#9fb7f9",
    300: "#6e93f5",
    400: "#3e6ff2",
    500: "#0e4bef",
    600: "#0b3cbf",
    700: "#082d8f",
    800: "#061e60",
    900: "#030f30",
  },
  greenAccent: {
    100: "#ccf9de",
    200: "#99f3bd",
    300: "#66ec9c",
    400: "#33e67b",
    500: "#00e05a",
    600: "#00b348",
    700: "#008636",
    800: "#005a24",
    900: "#002d12",
  },
  purpleAccent: {
    100: "#f2e5fc",
    200: "#e5ccf9",
    300: "#d9b2f6",
    400: "#cc99f3",
    500: "#bf7ff0",
    600: "#9966c0",
    700: "#734c90",
    800: "#4c3360",
    900: "#261930",
  },
  redAccent: {
    100: "#ffccd9",
    200: "#ff99b2",
    300: "#ff668c",
    400: "#ff3365",
    500: "#ff003f",
    600: "#cc0032",
    700: "#990026",
    800: "#660019",
    900: "#33000d",
  },
  dark: {
    100: "#d5d7d8",
    200: "#abafb0",
    300: "#818889",
    400: "#576061",
    500: "#2d383a",
    600: "#242d2e",
    700: "#1b2223",
    800: "#121617",
    900: "#090b0c",
  },
  light: {
    100: "#fcfdfd",
    200: "#fafafb",
    300: "#f7f8f8",
    400: "#f5f5f6",
    500: "#f2f3f4",
    600: "#c2c2c3",
    700: "#919292",
    800: "#616162",
    900: "#303131",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      // palette values for light mode
      primary: {
        main: colors.primary[700],
      },
      secondary: {
        main: colors.greenAccent[500],
      },
      neutral: {
        dark: colors.dark[700],
        main: colors.dark[300],
        light: colors.light[500],
      },
      background: {
        default: colors.light[500],
      },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
