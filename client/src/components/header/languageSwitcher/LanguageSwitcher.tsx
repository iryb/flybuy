import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage } from "@store/settings/slice";

import styles from "./styles.module.scss";

export const LanguageSwitcher = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.settings.language);

  const handleChange = (event: SelectChangeEvent): void => {
    localStorage.setItem("language", event.target.value);
    dispatch(setLanguage(event.target.value));
  };

  useEffect(() => {
    const localLanguage = localStorage.getItem("language");
    if (localLanguage) {
      dispatch(setLanguage(localLanguage));
    }
  }, []);

  return (
    <Select
      defaultValue={language}
      value={language}
      onChange={handleChange}
      variant="standard"
      IconComponent={() => <KeyboardArrowDownIcon />}
      className={clsx(className, styles.select, styles.customSelect)}
    >
      <MenuItem value="us">US</MenuItem>
      <MenuItem value="ua">UA</MenuItem>
    </Select>
  );
};
