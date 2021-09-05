import React, { useEffect } from 'react'
import cx from 'classnames'
import { Box, Button, useMediaQuery } from '@material-ui/core'
import {
  GridValueGetterParams,
  GridColDef,
  GridCellParams
} from '@material-ui/data-grid'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useIsDarkMode } from 'state/user/hooks'
import { FilterToolbar, PoolGrid } from 'components'

// import { consoleInit } from "../../config/pools/ethers_helper";
// import { getPoolInfo } from "hooks";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  overview: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto 20px',

    '& > .label': {
      fontSize: '18px',
      fontWeight: 900,
      paddingBottom: '10px'
    },
    '& > .value': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      color: palette.common.white
    }
  },
  actionButton: {
    borderRadius: '5px',
    padding: '10px',
    color: palette.common.white,
    width: '120px',
    fontSize: '12px',
  }
}))

const PoolDetailInfo: React.FC = () => {
  const { palette, breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })

  const renderAction = (params: GridCellParams): React.ReactNode => {
    return (
      <>
        <Button
          className={cx(classes.actionButton)}
          style={{ backgroundColor: palette.info.main }}
        >
          STAKE
        </Button>
        <Button
          className={cx(classes.actionButton)}
          style={{ backgroundColor: palette.error.main }}
        >
          UNSTAKE
        </Button>
        <Button
          className={cx(classes.actionButton)}
          style={{ backgroundColor: palette.success.main }}
        >
          CLAIM
        </Button>
      </>
    )
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: ' ',
      width: 30,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => {
        return `#${params.value}`
      }
    },
    {
      field: 'marketCap',
      headerName: 'MARKETCAP',
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'tvl',
      headerName: 'TVL',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => {
        if (params.value === 0) return '-'
        return `${params.value}`
      }
    },
    {
      field: 'totalStaked',
      headerName: 'TOTAL STAKED',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      flex: 1
    },
    {
      field: 'cakePerWeek',
      headerName: 'CAKE/WEEK',
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'apr',
      headerName: 'APR(DAY|WEEK|YEAR)',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      flex: 1
    },
    {
      field: 'myStaked',
      headerName: 'TOKENS YOU STAKED',
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'action',
      headerName: ' ',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      flex: 1,
      renderCell: renderAction
    }
  ]

  const rows = [
    {
      id: 1,
      marketCap: '19.12M',
      tvl: 0,
      totalStaked: '3789376.1426 CAKE',
      cakePerWeek: '63,000.00',
      apr: '0.24% | 1.66 % | 86.45 %',
      myStaked: '0'
    },
    {
      id: 2,
      marketCap: '19.12M',
      tvl: 0,
      totalStaked: '3789376.1426 CAKE',
      cakePerWeek: '63,000.00',
      apy: '0.24% | 1.66 % | 86.45 %',
      myStaked: '0'
    }
  ]

  // const main = getPoolInfo();
  useEffect(() => {
    // main && consoleInit(main);
    // eslint-disable-next-line
  }, [])

  return (
    <Box className={cx(classes.root)}>
      <FilterToolbar />

      <Box>
        <Box className={cx(classes.overview)}>
          <Box className='label'>POOLS</Box>
          <Box className='value' style={{ backgroundColor: '#FDC113' }}>
            11
          </Box>
        </Box>
        <Box className={cx(classes.overview)}>
          <Box className='label'>CAKE PRICE</Box>
          <Box className='value' style={{ backgroundColor: '#C81B72' }}>
            $0.5
          </Box>
        </Box>
        <Box className={cx(classes.overview)}>
          <Box className='label'>WBNB PRICE</Box>
          <Box className='value' style={{ backgroundColor: '#1BC870' }}>
            $500
          </Box>
        </Box>
      </Box>

      <Box>
        <PoolGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnSelector
          disableColumnMenu
          autoHeight
        />
      </Box>
    </Box>
  )
}

export default PoolDetailInfo
