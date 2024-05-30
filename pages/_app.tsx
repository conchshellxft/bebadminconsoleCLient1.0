import React from "react";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";

import { css } from "@emotion/react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import MoonLoader from "react-spinners/MoonLoader";
const override = css`
border-color: #50C878;
margin-left: 50%;
margin-top: 20%;
z-index: 99;
position: fixed;
`;

const theme = createTheme({
  typography: {
    fontFamily: ["Helvetica Neue Medium"].join(","),
    h6: {
      fontWeight: "bold",
    },
  },
  palette: {
    primary: {
      main: "#3E3E3E",
      "100": "#707070",
      "200": "#5BA62F",
      "300": "#85B82B",
    },
    secondary: {
      main: "#5BA62F",
      "100": "#85B82B",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 15px #0000001A",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: ["Helvetica Neue Medium"].join(","),
        },
      },
      defaultProps: {
        variant: "contained",
        style: {
          backgroundColor: "#59A630",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderRight: "0.1px solid rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },
});



export const AppContext = React.createContext<{
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
  setSnackData: (
    snackData: {
      severity: "info" | "error" | "warning" | "success";
      message: string;
    } | null
  ) => void;
  user: any;
  setUser: (user: any) => void;
  breadCrumbs: any;
  setBreadCrumbs: (breadCrumb: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  navOpen: true,
  setNavOpen: () => {},
  setSnackData: () => {},
  user: null,
  setUser: () => {},
  breadCrumbs: null,
  setBreadCrumbs: () => {},
  loading: true,
  setLoading :() => {}
});

function MyApp({ Component, pageProps }: AppProps) {
  const [navOpen, setNavOpen] = React.useState(true);
  const [snackData, setSnackData] = React.useState<{
    severity: "info" | "error" | "warning" | "success";
    message: string;
  } | null>(null);
  const [user, setUser] = React.useState(null);
  const [breadCrumbs, setBreadCrumbs] = React.useState<any>(null);
  
  const [loading, setLoading] = React.useState(false);
  const [color, setColor] = React.useState("#B1D4E0");
  
  
//   React.useEffect(() => {
//     return setBreadCrumbs(getFilteredRoutes().breadCrumbs);
//   }, []);

  return (
    <ThemeProvider theme={theme}>
      <MoonLoader  color={color} loading={loading}  size={100} />
      <AppContext.Provider
        value={{
          navOpen,
          setNavOpen,
          setSnackData,
          user,
          setUser,
          breadCrumbs,
          setBreadCrumbs,
          loading,
          setLoading
        }}
      >
         <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </LocalizationProvider>
        {/* <SnackAlert snackData={snackData} setSnackData={setSnackData} /> */}
      </AppContext.Provider>
    </ThemeProvider>
  );
}
export default MyApp;
