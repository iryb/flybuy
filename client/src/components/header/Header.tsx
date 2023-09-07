import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, useNavigate } from "react-router-dom";
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
import { fetchUser, logout } from "@store/user/slice";
import { getToken, removeToken } from "@/helpers/helpers";
import { AvatarMenu } from "../avatarMenu/AvatarMenu";
import { SearchBar } from "@/components/header/searchBar/SearchBar";
import { LanguageSwitcher } from "./languageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useIsMobile, useScrollBlock } from "@/hooks/hooks";

import styles from "./styles.module.scss";

export const Header = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const cart = useAppSelector((state) => state.cart.cart);
  const { blockScroll, allowScroll } = useScrollBlock();
  const navigate = useNavigate();
  const { isMobile } = useIsMobile(900);

  const authToken = getToken();

  const leftMenuPages = [
    {
      label: t("men"),
      path: "/category/men",
    },
    {
      label: t("women"),
      path: "/category/women",
    },
    {
      label: t("children"),
      path: "/category/children",
    },
  ];
  const rightMenuPages = [
    {
      label: t("about"),
      path: "/about",
    },
    {
      label: t("contact"),
      path: "/contact",
    },
  ];

  const [menuOpened, setMenuOpened] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setMenuOpened(!menuOpened);
    if (menuOpened) {
      allowScroll();
    } else {
      blockScroll();
    }
  };

  const handleLogout = (): void => {
    removeToken();
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (authToken) {
      void dispatch(fetchUser(authToken));
    }
  }, [authToken]);

  useEffect(() => {
    if (!isMobile) setMenuOpened(false);
  }, [isMobile]);

  return (
    <>
      <AppBar position="sticky" className={styles.header}>
        <Container>
          <Toolbar disableGutters={true} className={styles.toolbar}>
            <Box
              className={styles.leftCol}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <LanguageSwitcher className={styles.langSwitcherLight} />
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
      <Drawer
        anchor="top"
        variant="persistent"
        open={menuOpened}
        onClose={handleOpenNavMenu}
        className={styles.drawer}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            height: "100%",
            top: "64px",
            zIndex: "9",
          },
        }}
      >
        {leftMenuPages.map(({ label, path }) => (
          <Link to={path} className="link" key={label}>
            <MenuItem onClick={handleOpenNavMenu}>
              <Typography textAlign="center">{label}</Typography>
            </MenuItem>
          </Link>
        ))}
        {rightMenuPages.map(({ label, path }) => (
          <Link to={path} className="link" key={label}>
            <MenuItem onClick={handleOpenNavMenu}>
              <Typography textAlign="center">{label}</Typography>
            </MenuItem>
          </Link>
        ))}
        <Divider />
        <Link to={ApiPath.PROFILE} className={styles.link}>
          <MenuItem>{t("profile")}</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
        <Divider />
        <LanguageSwitcher className={styles.langSwitcherDark} />
      </Drawer>
      <MiniCart />
    </>
  );
};
