import React from "react";
import cx from "classnames";
import {
  Box,
  Container,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useIsDarkMode } from "state/user/hooks";
import { Footer, Header } from "layouts";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    background: palette.background.default,
    paddingTop: "100px",
    paddingBottom: "80px",
    position: 'fixed',
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    height: '100%',
  }
}));

export interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dark = useIsDarkMode();
  const { breakpoints } = useTheme();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  return (
    <Box className={cx(classes.root)}>
      <Header />
      <Container className={cx(classes.container)}>{children}</Container>
      <Footer />

      <Box id='log' display='none' />
    </Box>
  );
};

export default Layout;
