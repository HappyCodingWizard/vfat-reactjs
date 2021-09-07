import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '20px',
    padding: '30px 30px',
    width: '250px',
    color: theme.palette.background.default,
    fontSize: '15px',
    fontWeight: 100,

    '&:hover': {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.primary.main,
    }
  },
}))(Button);

export default StyledButton;
