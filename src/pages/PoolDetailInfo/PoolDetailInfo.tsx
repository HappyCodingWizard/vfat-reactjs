import React, { useEffect } from 'react'
import cx from 'classnames'
import { Box, useMediaQuery } from '@material-ui/core'
import { GridValueGetterParams } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useIsDarkMode } from 'state/user/hooks'
import { FilterToolbar, PoolGrid } from 'components'

// import { consoleInit } from "../../config/pools/ethers_helper";
// import { getPoolInfo } from "hooks";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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
      color: palette.common.white,
    }
  }
}))

const PoolDetailInfo: React.FC = () => {
  const { breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })
  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 4,
  //   maxColumns: 6,
  // });

  // const colorList = ['#FDC113', '#C81B72', '#1BC870']

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
