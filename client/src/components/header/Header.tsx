import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { setIsCartOpen } from "@store/cart/slice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { MiniCart } from "../miniCart/miniCart";
import { ApiPath } from "@/common/enums/apiPath";
import { fetchUser } from "@store/user/slice";
import { getToken } from "@/helpers/helpers";
import { AvatarMenu } from "../avatarMenu/AvatarMenu";
import { SearchBar } from "@/components/header/searchBar/SearchBar";

import styles from "./styles.module.scss";

export const Header = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const cart = useAppSelector((state) => state.cart.cart);

  const authToken = getToken();

  const leftMenuPages = [
    {
      label: "Men",
      path: "/category/men",
    },
    {
      label: "Women",
      path: "/category/women",
    },
    {
      label: "Children",
      path: "/category/children",
    },
  ];
  const rightMenuPages = [
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  const [menuOpened, setMenuOpened] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setMenuOpened(!menuOpened);
  };

  const handleCloseNavMenu = (): void => {
    setMenuOpened(false);
  };

  useEffect(() => {
    if (authToken) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(fetchUser(authToken));
    }
  }, [authToken]);

  return (
    <>
      <AppBar position="sticky" className={styles.header}>
        <Container>
          <Toolbar disableGutters={true} className={styles.toolbar}>
            <Box
              className={styles.leftCol}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <div className={styles.currency}>
                <span>USD</span>
                <KeyboardArrowDownIcon />
              </div>
              <div className={styles.menu}>
                {leftMenuPages.map(({ label, path }) => (
                  <Link to={path} className="link" key={label}>
                    <Typography>{label}</Typography>
                  </Link>
                ))}
              </div>
            </Box>
            <Box
              sx={{
                width: { sm: "33.33%" },
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                {menuOpened ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Drawer
                anchor="top"
                variant="persistent"
                open={menuOpened}
                onClose={handleOpenNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": {
                    width: "100%",
                    height: "100%",
                    top: "64px",
                  },
                }}
              >
                {leftMenuPages.map(({ label, path }) => (
                  <Link to={path} className="link" key={label}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{label}</Typography>
                    </MenuItem>
                  </Link>
                ))}
                <Divider />
                {rightMenuPages.map(({ label, path }) => (
                  <Link to={path} className="link" key={label}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{label}</Typography>
                    </MenuItem>
                  </Link>
                ))}
                <Divider />
                <div className={styles.currency}>
                  <span>USD</span>
                  <KeyboardArrowDownIcon />
                </div>
              </Drawer>
            </Box>
            <div className={styles.centerCol}>
              <Link to="/" className={styles.siteLogo}>
                <Typography
                  variant="h3"
                  component="h1"
                  className={styles.siteLogoText}
                >
                  FLYBUY
                </Typography>
              </Link>
            </div>
            <div className={styles.rightCol}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <div className={styles.menu}>
                  {rightMenuPages.map(({ label, path }) => (
                    <Link to={path} className="link" key={label}>
                      <Typography>{label}</Typography>
                    </Link>
                  ))}
                </div>
              </Box>
              <div className={styles.icons}>
                <SearchBar />
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  {!user.name && (
                    <Link to={ApiPath.SIGNIN} className={styles.link}>
                      <PersonOutlineIcon />
                    </Link>
                  )}
                  {user.name && <AvatarMenu />}
                </Box>
                {/* TODO:
                <FavoriteBorderIcon /> */}
                <IconButton
                  onClick={() => dispatch(setIsCartOpen())}
                  sx={{ color: "white" }}
                >
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingBasketIcon />
                  </Badge>
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <MiniCart />
    </>
  );
};
