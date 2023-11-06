import { Typography, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const Footer = (): React.ReactElement => {
  const { t } = useTranslation();

  const menu = [
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

  return (
    <footer className={styles.footer}>
      <Container>
        <Grid container className={styles.footerInner}>
          <Grid item sm={5} xs={12}>
            <Typography variant="h6" className={styles.footerTitle}>
              {t("footerTitle1")}
            </Typography>
            <Box className={styles.contactInfo}>
              <Typography className={styles.contactInfoTitle}>
                <MailOutlineIcon />
                <span>{t("footerEmailText")}</span>
              </Typography>
              <Link to="mailto:flybuy@gmail.com">flybuy@gmail.com</Link>
            </Box>
            <Box className={styles.contactInfo}>
              <Typography className={styles.contactInfoTitle}>
                <PhoneIcon />
                <span>{t("footerPhoneText")}</span>
              </Typography>
              <Link to="tel:900 456 003">900 456 003</Link>
            </Box>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Typography variant="h6" className={styles.footerTitle}>
              {t("footerTitle2")}
            </Typography>
            <Box className={styles.menu}>
              {menu.map(({ label, path }) => (
                <Link to={path} className={styles.menuLink} key={label}>
                  <Typography>{label}</Typography>
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item sm={2} xs={12}>
            <Box className={styles.socials}>
              <Link
                to="https://www.instagram.com/"
                target="_blank"
                className={styles.social}
              >
                <InstagramIcon />
              </Link>
              <Link
                to="https://twitter.com/"
                target="_blank"
                className={styles.social}
              >
                <TwitterIcon />
              </Link>
              <Link
                to="https://www.youtube.com/"
                target="_blank"
                className={styles.social}
              >
                <YouTubeIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box className={styles.copyright}>
          <Typography>{`© ${new Date().getFullYear()} FlyBuy`}</Typography>
        </Box>
      </Container>
    </footer>
  );
};
