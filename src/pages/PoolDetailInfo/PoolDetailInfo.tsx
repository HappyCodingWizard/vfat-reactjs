import React, { useEffect } from "react";
import cx from "classnames";
import { Box, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";
import { ImgButton, Typography } from "components";

import IMG_connect_wallet from "assets/img/bsc.svg";
import IMG_clear_browser from "assets/img/bsc.svg";
import { consoleInit } from "../../config/pools/ethers_helper";
import { getPoolInfo } from "hooks";

import $ from "jquery";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
}));

const PoolDetailInfo: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const main = getPoolInfo();

  useEffect(() => {
    main && consoleInit(main);

    let timer = setInterval(() => {
      $("#log").html($("#log").html().replace(/start/g, '<div class="pool-container"><div class="pool-board">'));
      $("#log").html($("#log").html().replace(/end/g, "</div></div>"));
    }, 100);

    setTimeout(() => {
      clearInterval(timer);
      alert('cleared');
    }, 30 * 1000)

    // eslint-disable-next-line
  }, []);

  return (
    <Box className={cx(classes.root)}>
      {main && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{today.toString()}</Typography>

            <Box>
              <ImgButton
                id="connect_wallet_button"
                label="Connect Wallet"
                src={IMG_connect_wallet}
                onClick={() => {}}
              />

              <ImgButton
                id="clear_browser_storage"
                label="Clear Browser Storage"
                src={IMG_clear_browser}
                onClick={() => {}}
              />
            </Box>
          </Box>
          <Box id="log" />
        </>
      )}
      {!main && (
        <Typography variant="h2" style={{ textAlign: "center" }}>
          Ooops! The page you are looking for doesn't exist!
        </Typography>
      )}
    </Box>
  );
};

export default PoolDetailInfo;
