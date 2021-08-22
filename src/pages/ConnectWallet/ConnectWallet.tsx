import React from "react";
import cx from "classnames";
import { Box, Button, TextField, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
  },

  connectButton: {
    backgroundColor: palette.primary.main,
    borderRadius: '20px',
    padding: '30px 30px',
    width: '250px',
    color: 'white',
    fontSize: '15px'
  },

  addressInput: {
    width: '250px',
    '& label': {
      color: '#61738E',
      fontSize: '12px',
    },
  },
}));

const ConnectWallet: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  return (
    <Box className={cx(classes.root)}>
      <Button 
        id="connect_wallet_button"
        className={cx(classes.connectButton)}
        onClick={() => {}}
      >
        CONNECT WALLET
      </Button>

      <TextField
        label="Enter your wallet address manually"
        className={cx(classes.addressInput)}
      />
    </Box>
  );
};

export default ConnectWallet;
