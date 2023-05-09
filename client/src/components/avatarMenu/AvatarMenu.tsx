import React from "react";
import { Box, Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "@helpers/helpers";
import { logout } from "@/store/user/slice";
import { ApiPath } from "@/common/enums/apiPath";

import styles from "./styles.module.scss";

export const AvatarMenu = (): React.ReactElement => {
  const user = useAppSelector((state) => state.user.data);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    removeToken();
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box className={styles.avatarMenuWrapper}>
      <IconButton onClick={handleAvatarClick}>
        <Avatar className={styles.avatarIcon}>{user.name.charAt(0)}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={ApiPath.PROFILE} className={styles.link}>
          <MenuItem>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
