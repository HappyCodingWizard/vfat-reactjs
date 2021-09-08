import { Select } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledSelect = withStyles((theme) => ({
  root: {
    borderRadius: '10px',
    backgroundColor: '#DAE7F9',
    padding: '10px 15px 8px',
    margin: '0px',
    fontSize: '10px',
    color: theme.palette.info.main,

    '&.MuiSelect-select': {
      paddingRight: '30px',
    },

    '&:focus': {
      backgroundColor: '#DAE7F9 !important',
      borderRadius: '10px !important',
    },
  },
  icon: {
    color: theme.palette.primary.light
  },
}))(Select);

export default StyledSelect;
