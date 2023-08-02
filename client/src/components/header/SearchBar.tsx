import { ApiPath } from "@/common/enums/apiPath";
import { Button, Popover, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = (): React.ReactElement => {
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
  };

  return (
    <>
      <Button aria-describedby={id} onClick={handleOpenSearch}>
        <SearchIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseSearch}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <form onSubmit={handleSearch}>
          <TextField
            id="search"
            type="search"
            label="Search"
            variant="filled"
            fullWidth
            onChange={handleChangeSearch}
          />
          <Button type="submit">
            <SearchIcon />
          </Button>
        </form>
      </Popover>
    </>
  );
};
