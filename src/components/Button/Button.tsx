import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '20px',
    padding: '30px 30px',
    width: '250px',
    color: 'white',
    fontSize: '15px',
  },
}))(Button);

export default StyledButton;
