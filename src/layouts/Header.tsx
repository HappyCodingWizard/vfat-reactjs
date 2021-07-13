import React, { useState } from "react";
import {
  Box,
  Link,
  IconButton,
  Drawer,
  useMediaQuery,
  Container,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Hamburger from "hamburger-react";
import cx from "classnames";

import { useIsDarkMode } from "state/user/hooks";
import { useLocation } from "react-router-dom";

import * as config from "config";

// import LOGO_Blue from "assets/logo_blue.png";
// import LOGO_Text from "assets/logo_text.png";

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  self: {
    position: "fixed",
    top: 0,
    zIndex: 100,
    width: "100%",
    padding: "20px 0px",
    background: palette.primary.main,
    boxShadow: "0 0 24px 0 #d58c613d",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    paddingLeft: "10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "& img": {
      padding: "20px 10px",
    },
    "& img:last-child": {
      filter: palette.type === "light" ? "invert(1)" : "invert(0)",
    },
  },

  navBar: {
    display: "flex",
    flexFlow: "wrap",
    alignItems: "center",

    "& a": {
      padding: "8px 16px",
      margin: "2px",
      color: palette.primary.dark,
      fontWeight: 700,
      fontSize: "14px",
      cursor: "pointer",
      background: palette.primary.light,
      borderRadius: "10px",

      "&:hover": {
        color: palette.primary.main,
        background: palette.primary.dark,
        textDecoration: "unset",
      },
    },

    "& .active": {
      color: palette.primary.main,
      background: palette.primary.dark,
    },

    [breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  },

  subHeader: {
    display: "flex",
    justifyContent: "flex-end",
    alignItem: "center",
  },
}));

const Header: React.FC = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dark = useIsDarkMode();
  const classes = useStyles({ dark, mobile });
  const { pathname } = useLocation<{ previous: string }>();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const isActiveURL = (link: string): boolean => {
    return pathname.indexOf(link) > -1;
  };

  return (
    <Box className={cx(classes.self)}>
      <Container>
        <Box className={cx(classes.container)}>
          {/* <Box className={cx(classes.logo)} onClick={() => history.push("/")}>
            <img src={LOGO_Blue} alt="Ardana Logo" />
            <img src={LOGO_Text} alt="Ardana Logo" />
          </Box> */}

          {!mobile && (
            <Box className={cx(classes.navBar)}>
              {config.Routes.map((navItem, index) => (
                <Link
                  className={isActiveURL(navItem.path) ? "active" : ""}
                  key={index}
                  href={navItem.path}
                >
                  {navItem.label}
                </Link>
              ))}
            </Box>
          )}

          {mobile && (
            <>
              <IconButton
                style={{ height: "48px", padding: 0 }}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <Hamburger
                  size={24}
                  distance={"lg"}
                  color={theme.palette.text.primary}
                  toggled={openMenu}
                  toggle={setOpenMenu}
                />
              </IconButton>
              <Drawer anchor={"top"} open={openMenu} onClose={toggleMenu}>
                <Box className={cx(classes.navBar)}>
                  {config.Routes.map((navItem, index) => (
                    <Link key={index} href={navItem.path}>
                      {navItem.label}
                    </Link>
                  ))}
                </Box>
              </Drawer>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
