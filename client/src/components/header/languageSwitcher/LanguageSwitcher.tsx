import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage } from "@store/settings/slice";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/hooks";

import styles from "./styles.module.scss";

export const LanguageSwitcher = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.settings.language);
  const { i18n } = useTranslation();
  const { isMobile } = useIsMobile(900);

  const handleChange = (event: SelectChangeEvent): void => {
    localStorage.setItem("language", event.target.value);
    dispatch(setLanguage(event.target.value));
    void i18n.changeLanguage(event.target.value);
  };

  const handleMobileChange = (lang: string): void => {
    localStorage.setItem("language", lang);
    dispatch(setLanguage(lang));
    void i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const localLanguage = localStorage.getItem("language");
    if (localLanguage) {
      dispatch(setLanguage(localLanguage));
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <Box className={styles.mobileContainer}>
          <MenuItem onClick={() => handleMobileChange("en")}>EN</MenuItem>
          <MenuItem onClick={() => handleMobileChange("uk-UA")}>UA</MenuItem>
        </Box>
      ) : (
        <Select
          defaultValue={language}
          value={language}
          onChange={handleChange}
          variant="standard"
          IconComponent={() => <KeyboardArrowDownIcon />}
          className={clsx(className, styles.select, styles.customSelect)}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="uk-UA">UA</MenuItem>
        </Select>
      )}
    </>
  );
};
