import React, { useState } from "react";
import cx from "classnames";
import { Box, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";
import SortIcon from '@material-ui/icons/Sort'

import ICON_DOWN from 'assets/icon/material-arrow-drop-down.svg'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  
  filter: {
    display: 'flex',
    alignItems: 'center'
  },

  showFilter: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',

    '& > svg': {
      transform: 'rotateY(180deg)',
      marginRight: '10px'
    }
  },
  hideFilter: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '12px',
    marginTop: '10px',

    '&:hover': {
      color: 'gray'
    }
  },

  filterItem: {
    borderRadius: '10px',
    backgroundColor: '#DAE7F9',
    padding: '10px',
    margin: '0px 10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '10px',
    cursor: 'pointer'
  },
}));

export interface ToolbarProps {
}

const Toolbar: React.FC<ToolbarProps> = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });
  const [filterToggle, setFilterToggle] = useState<boolean>(false)

  const handleFilterToggle = () => {
    setFilterToggle(!filterToggle)
  }

  return (
    <Box className={cx(classes.root)}>
      <Box className={cx(classes.filter)}>
        {!filterToggle && (
          <Box
            className={cx(classes.showFilter)}
            onClick={handleFilterToggle}
          >
            <SortIcon color='primary' />
            Filter
          </Box>
        )}
        {filterToggle && (
          <Box>
            <Box display='flex'>
              <Box className={cx(classes.filterItem)}>
                TVL&nbsp;
                <img src={ICON_DOWN} alt='down' width='10px' height='10px' />
              </Box>
              <Box className={cx(classes.filterItem)}>
                Reward&nbsp;
                <img src={ICON_DOWN} alt='down' width='10px' height='10px' />
              </Box>
              <Box className={cx(classes.filterItem)}>
                Last 30 days&nbsp;
                <img src={ICON_DOWN} alt='down' width='10px' height='10px' />
              </Box>
            </Box>
            <Box
              className={cx(classes.hideFilter)}
              onClick={handleFilterToggle}
            >
              Hide Filter
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Toolbar;
