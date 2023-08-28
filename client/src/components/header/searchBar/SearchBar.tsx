import { ApiPath } from "@/common/enums/apiPath";
import { Box, Button, InputBase, Popover } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const SearchBar = (): React.ReactElement => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const id = open ? "search-modal" : undefined;

  const handleOpenSearch = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSearch = (): void => {
    setAnchorEl(null);
  };

  const handleChangeSearch = (e: any): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleSearch = (e: any): void => {
    e.preventDefault();
    navigate(`${ApiPath.SEARCH}?s=${searchTerm}`);
    setAnchorEl(null);
  };

  return (
    <Box className={styles.searchBar}>
      <Button
        aria-describedby={id}
        className={styles.modalToggler}
        onClick={handleOpenSearch}
      >
        <SearchIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseSearch}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 2,
          transition: "opacity 300ms",
          "& .MuiPopover-paper": {
            top: "75px !important",
          },
        }}
        className={styles.searchModal}
      >
        <form onSubmit={handleSearch} className={styles.form}>
          <InputBase
            id="search"
            type="search"
            fullWidth
            onChange={handleChangeSearch}
            placeholder={t("search")}
            className={styles.searchInput}
          />
          <Button type="submit" className={styles.button}>
            <SearchIcon />
          </Button>
        </form>
      </Popover>
    </Box>
  );
};
