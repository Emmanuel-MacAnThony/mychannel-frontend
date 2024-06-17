import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import ThemeSwitch from "../../../components/ThemeSwitch";
import { useState } from "react";

const AccountButton = () => {
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = () => {
    return (
      <Menu
        open={isMenuOpen}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        keepMounted
        onClose={handleProfileMenuClose}
      >
        <MenuItem>
          <ThemeSwitch />
        </MenuItem>
      </Menu>
    );
  };
  return (
    <Box
      sx={{
        display: { xs: "flex" },
        justifyContent: "space-between",
      }}
    >
      <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
        <AccountCircle sx={{ fontSize: "34px" }} />
      </IconButton>
      {renderMenu()}
    </Box>
  );
};

export default AccountButton;
