import { withStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
// import { DataGridPro } from '@mui/x-data-grid-pro';

const StyledDataGrid = withStyles(theme => ({
  root: {
    border: 'unset',
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 900,
      fontSize: '12px',
      color: theme.palette.primary.main,
    },
    '& .MuiDataGrid-columnSeparator': {
      display: 'none'
    },
    '& .MuiDataGrid-columnsContainer': {
      border: 'unset !important',
    },
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
      outline: 'none !important'
    },
    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within':{
      outline: 'none !important'
    },
    '& .MuiDataGrid-window, & .MuiDataGrid-viewport': {
      // overflow: 'unset !important',
    },
    '& .MuiDataGrid-cell': {
      border: 'unset !important',
      padding: 'unset !important',
    },

    '& .MuiDataGrid-renderingZone': {
      '& > div:nth-child(even)': {
        background: '#FFFFFF'
      },
      '& > div:nth-child(odd)': {
        background: '#F3F3F3'
      }
    },

    '& .MuiDataGrid-columnHeaderTitleContainer': {
      padding: 'unset !important',
      fontSize: 13,
      fontWeight: 'bold',
      cursor: 'pointer',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      lineHeight: '100%'
    },

    '& .MuiDataGrid-footerContainer': {
      display: 'none',
    },

    '& *::-webkit-scrollbar': {
      background: 'unset',
      height: '10px'
    },

    '& *::-webkit-scrollbar-thumb': {
      border: 'unset !important',
      backgroundColor: 'lightgray',
    },
  },
  columnHeader: {
    padding: '0 !important'
  },
  row: {
    fontWeight: 'normal',
    fontSize: '12px',
    color: theme.palette.primary.main,
    width: '100% !important',
    padding: '0 5px',
    cursor: 'pointer',
  },
  cell: {
    border: 'unset !important'
  }
}))(DataGrid);

export default StyledDataGrid;
