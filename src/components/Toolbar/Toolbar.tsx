import React, { useState } from "react";
import cx from "classnames";
import { Box, MenuItem, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";
import SortIcon from '@material-ui/icons/Sort'

// import ICON_DOWN from 'assets/icon/material-arrow-drop-down.svg'
import Select from "components/Select";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 100,
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
  filterSelect: {
    color: 'red',
    margin: 'auto 5px',
    '&::before, &::after': {
      display: 'none',
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
  filterMenuItem: {
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
  }
}));

export interface ToolbarProps {
}

const Toolbar: React.FC<ToolbarProps> = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });
  const [filterToggle, setFilterToggle] = useState<boolean>(false)
  const [filter, setFilter] = useState({
    token: 'TVL',
    reward: 'Reward',
    period: '30d',
  })

  const handleFilterToggle = () => {
    setFilterToggle(!filterToggle)
  }

  const handleFilterChange = (type: string, value: string) => {
    switch (type) {
      case 'TVL':
        setFilter({
          ...filter,
          token: value
        })
        break;
      case 'Reward':
        setFilter({
          ...filter,
          reward: value
        })
        break;
      case 'Period':
        setFilter({
          ...filter,
          period: value
        })
        break;
      default:
        break;
    }
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
              <Select
                labelId="Select-TVL-label"
                id="Select-TVL"
                className={cx(classes.filterSelect)}
                value={filter.token}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => handleFilterChange('TVL', event.target.value as string)}
              >
                <MenuItem className={cx(classes.filterMenuItem)} value={'TVL'}>TVL</MenuItem>
                <MenuItem className={cx(classes.filterMenuItem)} value={'TVL1'}>TVL1</MenuItem>
                <MenuItem className={cx(classes.filterMenuItem)} value={'TVL2'}>TVL2</MenuItem>
              </Select>

              <Select
                labelId="Select-Reward-label"
                id="Select-Reward"
                className={cx(classes.filterSelect)}
                value={filter.reward}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => handleFilterChange('Reward', event.target.value as string)}
              >
                <MenuItem className={cx(classes.filterMenuItem)} value={'Reward'}>Reward</MenuItem>
                <MenuItem className={cx(classes.filterMenuItem)} value={'Reward1'}>Reward1</MenuItem>
                <MenuItem className={cx(classes.filterMenuItem)} value={'Reward2'}>Reward2</MenuItem>
              </Select>

              <Select
                labelId="Select-period-label"
                id="Select-period"
                className={cx(classes.filterSelect)}
                value={filter.period}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => handleFilterChange('Period', event.target.value as string)}
              >
                <MenuItem className={cx(classes.filterMenuItem)} value={'30d'}>Last 30 days</MenuItem>
                <MenuItem className={cx(classes.filterMenuItem)} value={'1d'}>Last 1 day</MenuItem>
                <MenuItem className={cx(classes.filterMenuItem)} value={'2d'}>Last 2 days</MenuItem>
              </Select>
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
