import { withStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';

const StyledDataGrid = withStyles(theme => ({
  root: {
    border: 'unset',
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 900,
      fontSize: '15px',
      color: theme.palette.primary.main,
    },
    '& .MuiDataGrid-columnSeparator': {
      opacity: '0 !important',
      border: 'unset',
    },
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
      outline: 'none !important'
    },
    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within':{
      outline: 'none !important'
    },
    '& .MuiDataGrid-window, & .MuiDataGrid-viewport': {
      overflow: 'unset !important',
    },
    '& .MuiDataGrid-cell': {
      border: 'unset !important'
    }
  },
  columnHeader: {
  },
  row: {
    fontWeight: 'normal',
    fontSize: '15px',
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
