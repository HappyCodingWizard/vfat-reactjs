import React from "react";
import cx from "classnames";
import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
}));

const SeignioragePage: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return (
    <Box className={cx(classes.root)}>
      <Typography variant="h6" style={{ textAlign: "right" }}>
        {today.toString()}
      </Typography>
    </Box>
  );
};

export default SeignioragePage;
