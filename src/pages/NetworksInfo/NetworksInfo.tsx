import React from "react";
import cx from "classnames";
import { Box, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";

import { getNetworkInfo } from "hooks";
import { DataTable } from "components";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
}));

const NetworksInfo: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  const TableData = getNetworkInfo();
  const { title, heading, rows } = TableData;

  return (
    <Box className={cx(classes.root)}>
      <DataTable logo title={title} heading={heading} rows={rows} />
    </Box>
  );
};

export default NetworksInfo;
