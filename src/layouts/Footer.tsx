import React from "react";
import {
  Box,
  useMediaQuery,
  Container,
  Link,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import cx from "classnames";

import { useIsDarkMode } from "state/user/hooks";
import { Typography } from "components";

// import LOGO_White from "assets/logo_white.png";
// import LOGO_Text from "assets/logo_text.png";

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  bg: {
    background: palette.primary.main,
    marginTop: "50px",
    padding: 30,
  },

  logo: {
    paddingLeft: "10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "& img": {
      padding: "20px 10px",
    },
  },

  disclaimerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  socialContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },

  socialIconLink: {
    borderRadius: "50%",
    backgroundColor: palette.primary.dark,
    padding: "10px",
    marginRight: "20px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background .2s",
    fontFamily: "auto",

    "& i": {
      width: "16px",
      height: "16px",
    },

    "&:hover": {
      boxShadow: "0 0 24px 0 #341f103d",
    },
  },
}));

const Footer: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  return (
    <Box className={cx(classes.bg)}>
      <Container>
        <Box className={cx(classes.disclaimerContainer)}>
          <Typography variant="h6">
            This project has recently been updated.
          </Typography>
          <br />
          <br />
          <Typography variant="h4">*** Disclaimer ***</Typography>
          <Typography variant="h6">
            I am in no way affiliated with the above projects, nor do I endorse
            them. Please do your own research before investing.
          </Typography>
        </Box>

        <Box mt="30px"></Box>

        <Box className={cx(classes.socialContainer)}>
          {/* <Box className={cx(classes.logo)}>
            <img src={LOGO_White} alt="logo" />
            <img src={LOGO_Text} alt="logo" />
          </Box> */}
          <Box>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-medium"></i>
            </Link>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-linkedin"></i>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
