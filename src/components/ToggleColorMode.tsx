import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import createMuiTheme from "../theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext } from "../context/DarkModeContext";

interface Props {
  children: ReactNode;
}

const ToggleColorMode: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("colorMode") as "light" | "dark") || "light";
  });

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);
  const theme = React.useMemo(() => createMuiTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
