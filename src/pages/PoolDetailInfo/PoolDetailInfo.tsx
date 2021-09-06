import React, { useEffect, useState } from 'react'
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

import { consoleInit } from "../../config/pools/ethers_helper";
import { getPoolInfo, nFormatter } from "hooks";
import { useNetwork } from 'state/network/hooks'
import { useHistory } from 'react-router'
import { usePool, usePoolToken } from 'state/pool/hooks'
import { isNaN } from 'lodash'

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
  },
  priceCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    lineHeight: '100%',

    '& > span:last-child': {
      fontSize: '9px',
    }
  }
}))

const PoolDetailInfo: React.FC = () => {
  const { palette, breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })
  const [network] = useNetwork()
  const history = useHistory();
  const [pool] = usePool();
  const [token] = usePoolToken();
  const [rows, setRows] = useState([]);

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

  const renderTwoPrice = (params: GridCellParams): React.ReactNode => {
    const price = params.getValue(params.id, `${params.field}`)
    const priceUsd = params.getValue(params.id, `${params.field}Usd`)
    return (
      <>
        <Box className={cx(classes.priceCell)}>
          <span>{price}</span>
          <span>{`(${priceUsd})`}</span>
        </Box>
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
      flex: 1,
      renderCell: renderTwoPrice
    },
    {
      field: 'cakePerWeek',
      headerName: 'CAKE/WEEK',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: renderTwoPrice
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

  // const rows = [
  //   {
  //     id: 1,
  //     marketCap: '19.12M',
  //     tvl: 0,
  //     totalStaked: '3789376.1426 CAKE',
  //     cakePerWeek: '63,000.00',
  //     apr: '0.24% | 1.66 % | 86.45 %',
  //     myStaked: '0'
  //   },
  //   {
  //     id: 2,
  //     marketCap: '19.12M',
  //     tvl: 0,
  //     totalStaked: '3789376.1426 CAKE',
  //     cakePerWeek: '63,000.00',
  //     apr: '0.24% | 1.66 % | 86.45 %',
  //     myStaked: '0'
  //   }
  // ]

  const mapToTable = (poolInfos: any[]): any => {
    console.log(poolInfos);
    return poolInfos.map((poolInfo) => {
      const yearlyAPR = isNaN(poolInfo.yearlyAPR) ? 0 : poolInfo.yearlyAPR,
            weeklyAPR = yearlyAPR / 52,
            dailyAPR = yearlyAPR / 365
      return {
        id: poolInfo.poolIndex + 1,
        marketCap: nFormatter(poolInfo.poolPrices.marketCap, 2) ?? '',
        tvl: poolInfo.poolPrices.tvl ? nFormatter(poolInfo.poolPrices.tvl, 2) : '-',
        totalStaked: `${poolInfo.poolPrices.staked.toFixed(4)} ${token}`,
        totalStakedUsd: nFormatter(poolInfo.totalStakedUsd, 2),
        cakePerWeek: poolInfo.poolRewardsPerWeek,
        cakePerWeekUsd: nFormatter(poolInfo.poolRewardsPerWeekUsd, 2),
        apr: `${dailyAPR.toFixed(2)}% | ${weeklyAPR.toFixed(2)}% | ${yearlyAPR.toFixed(2)}%`,
        myStaked: isNaN(poolInfo.userStakedPct) ? 0 : poolInfo.userStakedPct
      }
    })
  }

  const main = getPoolInfo();
  useEffect(() => {
    (async() => {
      main && consoleInit(main)
    })();
    // eslint-disable-next-line
  }, [main])

  useEffect(() => {
    if (!network) history.push('/networks')
    // eslint-disable-next-line
  }, [network])

  useEffect(() => {
    if (pool) {
      setRows(mapToTable(pool))
    }
    // eslint-disable-next-line
  }, [pool])

  return (
    <Box className={cx(classes.root)}>
      <FilterToolbar />

      <Box>
        <Box className={cx(classes.overview)}>
          <Box className='label'>POOLS</Box>
          <Box className='value' style={{ backgroundColor: '#FDC113' }}>
            {rows.length}
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
