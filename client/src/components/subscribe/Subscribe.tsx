import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const Subscribe = (): React.ReactElement => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  return (
    <Box className={styles.section}>
      <Container>
        <Typography variant="h3">{t("subscribeTitle")}</Typography>
        <Typography className={styles.subtitle}>
          {t("subscribeText")}
        </Typography>
        <Box className={styles.subscribeField}>
          <TextField
            placeholder={t("subscibeEmailText")}
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            className={styles.input}
            sx={{
              ".MuiInputBase-root": {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />
          <Button
            className={styles.button}
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            {t("subscribeBtnText")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
