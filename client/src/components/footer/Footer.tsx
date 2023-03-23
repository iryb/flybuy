import { Typography, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

import styles from "./styles.module.scss";
import IconButton from "@mui/material/IconButton";

const menu = [
  {
    label: "Men",
    path: "/products/men",
  },
  {
    label: "Women",
    path: "/products/women",
  },
  {
    label: "Children",
    path: "/products/children",
  },
];

export const Footer = (): React.ReactElement => {
  return (
    <Box className={styles.footer}>
      <Container>
        <Grid container className={styles.footerInner}>
          <Grid item sm={5} xs={12}>
            <Typography variant="h6" className={styles.footerTitle}>
              Can we help you?
            </Typography>
            <Box className={styles.contactInfo}>
              <Typography className={styles.contactInfoTitle}>
                <MailOutlineIcon />
                <span>Email us</span>
              </Typography>
              <Link to="mailto:flybuy@gmail.com">flybuy@gmail.com</Link>
            </Box>
            <Box className={styles.contactInfo}>
              <Typography className={styles.contactInfoTitle}>
                <PhoneIcon />
                <span>Call us</span>
              </Typography>
              <Link to="tel:900 456 003">900 456 003</Link>
            </Box>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Typography variant="h6" className={styles.footerTitle}>
              Our collections
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
    </Box>
  );
};
