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
  },
  container: {    
    boxShadow: "0 0 24px 0 #d58c613d",
    backgroundColor: "#fff6ef",
    borderRadius: "12px",
    padding: "24px",
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
    </Box>
  );
};

export default Layout;
