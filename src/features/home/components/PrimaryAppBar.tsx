import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";

const PrimaryAppBar = () => {
  const theme = useTheme();
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen, sideMenu]);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    event.preventDefault();
    setSideMenu(open);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <Toolbar
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
        variant="dense"
      >
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(!sideMenu)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
          {[...Array(100)].map((_, i) => {
            return (
              <Typography key={i} paragraph>
                {i + 1}
              </Typography>
            );
          })}
        </Drawer>
        <Link href="/" underline="none" color={"inherit"}>
          <Typography
            variant="h6"
            noWrap
            component={"div"}
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            CHANNELCHAT
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
