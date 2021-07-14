import React from "react";
import cx from "classnames";
import { Box, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";

import { getAppTable } from "hooks";
import { DataTable } from "components";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  caption: {
    captionSide: "top!important" as "top",
    textAlign: "center!important" as "center",
    fontSize: "32px!important" as "32px",
  },
  poolLogo: {
    height: "30px",
  },
}));

const PoolsInfo: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  const TableData = getAppTable();
  const { title, heading, rows } = TableData;

  return (
    <Box className={cx(classes.root)}>
      <DataTable logo title={title} heading={heading} rows={rows} />
    </Box>
  );
};

export default PoolsInfo;
