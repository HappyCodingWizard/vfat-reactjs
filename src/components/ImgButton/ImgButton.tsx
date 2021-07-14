import React from "react";
import cx from "classnames";
import { Box, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: "inline-block",
    padding: "4px 16px 4px 25px",
    margin: "10px",
    borderRadius: "50px",
    background: palette.secondary.main,
    color: palette.text.primary,
    cursor: "pointer",
    position: "relative",

    "&:hover": {
      boxShadow: "0 0 24px 0 #d58c613d",
    },

    "& > img": {
      position: "absolute",
      left: "-15px",
      top: "-1px",
      width: "32px",
      height: "32px",
    },

    "& > span": {
      fontSize: "15px",
    },
  }
}));

export interface ImgButtonProps {
  id: string;
  label: string;
  src: string;
  onClick: any;
}

const ImgButton: React.FC<ImgButtonProps> = ({ id, label, src, onClick }) => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  return (
    <Box className={cx(classes.root)} onClick={onClick} id={id}>
      <img src={src} alt="img" />
      <span>{label}</span>
    </Box>
  );
};

export default ImgButton;
