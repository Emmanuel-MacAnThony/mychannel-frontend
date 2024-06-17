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
import ExploreCategories from "./ExploreCategories";
import AccountButton from "./AccountButton";

const PrimaryAppBar = () => {
  const theme = useTheme();
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const list = () => {
    return (
      <Box
        sx={{
          paddingTop: `${theme.primaryAppBar.height}px`,
          minWidth: 200,
        }}
        onClick={toggleDrawer(false)}
        onKeydown={toggleDrawer(false)}
        role="presentation"
      >
        <ExploreCategories />
      </Box>
    );
  };

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
          {list()}
        </Drawer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
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
          <Box>
            <AccountButton />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
