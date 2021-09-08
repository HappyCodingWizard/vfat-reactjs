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

import { consoleInit } from '../../config/pools/ethers_helper'
import { getPoolInfo, nFormatter } from 'hooks'
import { useNetwork } from 'state/network/hooks'
import { useHistory } from 'react-router'
import { usePool, usePoolToken } from 'state/pool/hooks'
import { isNaN } from 'lodash'
import { useDispatch } from 'react-redux'
import { emptyPoolInfoAction } from 'state/pool/actions'

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    flexDirection: 'column',
    height: '100%'
  },
  toolbar: {
    position: 'absolute',
    display: 'flex',
    right: '20px',
    top: '30px',
    [breakpoints.down('xs')]: {
      top: '0px'
    }
  },

  overview: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px',

    '& > .label': {
      fontSize: '18px',
      fontWeight: 'bold',
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
    },

    [breakpoints.down('sm')]: {
      margin: '10px',
      '& > .label': {
        fontSize: '12px'
      },
      '& > .value': {
        fontSize: '12px',
        width: '40px',
        height: '40px'
      }
    }
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: '20px',
    marginRight: '20px',

    '& .label': {
      color: palette.info.main,
      paddingRight: '15px'
    },

    '& .pageNumbers': {
      color: palette.primary.light,
      cursor: 'pointer',
      display: 'flex',

      '& .separater': {
        margin: 'auto 5px'
      }
    },

    '& .active': {
      color: palette.info.main
    }
  },

  actionButton: {
    borderRadius: '5px',
    padding: '10px',
    color: palette.common.white,
    fontSize: '12px'
  },
  priceCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    lineHeight: '100%',

    '& > span:last-child': {
      fontSize: '9px'
    }
  }
}))

const PoolDetailInfo: React.FC = () => {
  const dispatch = useDispatch()
  const { palette, breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })
  const [network] = useNetwork()
  const history = useHistory()
  const [pool] = usePool()
  const [token] = usePoolToken()
  const [rows, setRows] = useState([])
  const rowsPerPage = 5
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(0)

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
      headerName: '',
      width: 10,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => {
        return `#${params.value}`
      },
      renderHeader: () => <></>
    },
    {
      field: 'marketCap',
      headerName: '',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderHeader: () => <>MARKETCAP</>
    },
    {
      field: 'tvl',
      headerName: '',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => {
        if (params.value === 0) return '-'
        return `${params.value}`
      },
      renderHeader: () => <>TVL</>
    },
    {
      field: 'totalStaked',
      headerName: '',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      minWidth: 200,
      renderCell: renderTwoPrice,
      renderHeader: () => <>TOTAL STAKED</>
    },
    {
      field: 'cakePerWeek',
      headerName: 'CAKE/WEEK',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: renderTwoPrice,
      renderHeader: () => <>CAKE/WEEK</>
    },
    {
      field: 'apr',
      headerName: '',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      minWidth: 200,
      renderHeader: () => <>APR (DAY|WEEK|YEAR)</>
    },
    {
      field: 'myStaked',
      headerName: '',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      flex: 1,
      renderHeader: () => <>TOKENS YOU STAKED</>
    },
    {
      field: 'action',
      headerName: '',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      minWidth: 300,
      renderCell: renderAction,
      renderHeader: () => <></>
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
    console.log(poolInfos)
    return poolInfos.map(poolInfo => {
      const yearlyAPR = isNaN(poolInfo.yearlyAPR) ? 0 : poolInfo.yearlyAPR,
        weeklyAPR = yearlyAPR / 52,
        dailyAPR = yearlyAPR / 365
      return {
        id: poolInfo.poolIndex + 1,
        marketCap: nFormatter(poolInfo.poolPrices.marketCap, 2) ?? '',
        tvl: poolInfo.poolPrices.tvl
          ? nFormatter(poolInfo.poolPrices.tvl, 2)
          : '-',
        totalStaked: `${poolInfo.poolPrices.staked.toFixed(4)} ${token}`,
        totalStakedUsd: nFormatter(poolInfo.totalStakedUsd, 2),
        cakePerWeek: poolInfo.poolRewardsPerWeek,
        cakePerWeekUsd: nFormatter(poolInfo.poolRewardsPerWeekUsd, 2),
        apr: `${dailyAPR.toFixed(2)}% | ${weeklyAPR.toFixed(
          2
        )}% | ${yearlyAPR.toFixed(2)}%`,
        myStaked: isNaN(poolInfo.userStakedPct) ? 0 : poolInfo.userStakedPct
      }
    })
  }

  const main = getPoolInfo()

  useEffect(() => {
    dispatch(emptyPoolInfoAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    ;(async () => {
      main && consoleInit(main)
    })()
    // eslint-disable-next-line
  }, [main])

  useEffect(() => {
    if (!network) history.push('/networks')
    // eslint-disable-next-line
  }, [network])

  useEffect(() => {
    if (pool) {
      setRows(mapToTable(pool))
      setPageCount(Math.ceil(rows.length / rowsPerPage))
      setPageIndex(1)
    }
    // eslint-disable-next-line
  }, [pool])

  return (
    <Box className={cx(classes.root)}>
      <Box className={cx(classes.toolbar)}>
        <FilterToolbar />
      </Box>

      <Box textAlign={!mobile ? 'left' : 'center'}>
        <Box className={cx(classes.overview)}>
          <Box className='label'>POOLS</Box>
          <Box className='value' style={{ backgroundColor: palette.error.main }}>
            {rows.length}
          </Box>
        </Box>
        <Box className={cx(classes.overview)}>
          <Box className='label'>CAKE PRICE</Box>
          <Box className='value' style={{ backgroundColor: palette.success.main }}>
            $0.5
          </Box>
        </Box>
        <Box className={cx(classes.overview)}>
          <Box className='label'>WBNB PRICE</Box>
          <Box className='value' style={{ backgroundColor: palette.warning.main }}>
            $500
          </Box>
        </Box>
      </Box>

      <Box width='100%' height='330px'>
        <PoolGrid
          rows={rows.slice(
            (pageIndex - 1) * rowsPerPage,
            pageIndex * rowsPerPage
          )}
          columns={columns}
          pageSize={rowsPerPage}
          loading={rows.length === 0}
          rowsPerPageOptions={[rowsPerPage]}
          disableSelectionOnClick
          disableColumnSelector
          disableColumnMenu
          headerHeight={35}
          hideFooterPagination
        />
      </Box>
      <Box className={cx(classes.paginationContainer)}>
        <Box className='label'>PAGES</Box>
        <Box className='pageNumbers'>
          {pageCount !== 0 &&
            Array.from(Array(pageCount)).map((x, i) => {
              return (
                <Box key={i}>
                  <Box component='span' className='separater'>
                    {i !== 0 && '|'}
                  </Box>
                  <Box
                    component='span'
                    className={cx({ active: i + 1 === pageIndex })}
                    onClick={() => setPageIndex(i + 1)}
                  >
                    {i + 1}
                  </Box>
                </Box>
              )
            })}
        </Box>
      </Box>
    </Box>
  )
}

export default PoolDetailInfo
