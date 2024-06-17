import { Box, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SecondaryDraw: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minWidth: `${theme.secondaryDraw.width}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        mt: `${theme.primaryAppBar.height}px`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: {
          xs: "none",
          sm: "block",
        },
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default SecondaryDraw;
