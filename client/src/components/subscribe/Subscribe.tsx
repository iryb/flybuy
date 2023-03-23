import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import styles from "./styles.module.scss";

export const Subscribe = (): React.ReactElement => {
  const [email, setEmail] = useState("");

  return (
    <Box className={styles.section}>
      <Container>
        <Typography variant="h3">Get 10% off</Typography>
        <Typography className={styles.subtitle}>
          Subscribe to the newsletter and get 10% off your next shop, access to
          special offers and much more!
        </Typography>
        <Box className={styles.subscribeField}>
          <TextField
            placeholder="Enter your email"
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
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
