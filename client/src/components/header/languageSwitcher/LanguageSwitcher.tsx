import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage } from "@store/settings/slice";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const LanguageSwitcher = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.settings.language);
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent): void => {
    localStorage.setItem("language", event.target.value);
    dispatch(setLanguage(event.target.value));
    void i18n.changeLanguage(event.target.value);
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
      <MenuItem value="en">US</MenuItem>
      <MenuItem value="uk-UA">UA</MenuItem>
    </Select>
  );
};
